<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\HousePayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Initialize Paystack payment
     */
    public function initialize(Request $request)
    {
        $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'amount' => 'required|numeric|min:1',
            'type' => 'required|string|in:initial,rent,deposit',
        ]);

        $apartment = Apartment::findOrFail($request->apartment_id);
        $user = Auth::user();
        
        // Calculate amount based on type
        $amount = $this->calculateAmount($apartment, $request->type, $request->amount);
        
        // Generate unique reference
        $reference = 'PAY_' . time() . '_' . $user->id . '_' . $apartment->id;
        
        // Create pending payment record
        $payment = HousePayment::create([
            'apartment_id' => $apartment->id,
            'user_id' => $user->id,
            'amount' => $amount,
            'due_date' => now()->addDays(7),
            'date' => now(),
            'status' => 'pending',
            'note' => ucfirst($request->type) . ' payment for ' . $apartment->title,
            'mode' => $request->type,
            'type' => $request->type === 'rent' ? 'recurring' : 'one-time',
            'method' => 'paystack',
            'reference' => $reference,
            'meta' => [
                'paystack_reference' => $reference,
                'apartment_slug' => $apartment->slug,
            ],
        ]);

        // Initialize Paystack payment
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.paystack.secret_key'),
            'Content-Type' => 'application/json',
        ])->post('https://api.paystack.co/transaction/initialize', [
            'email' => $user->email,
            'amount' => $amount * 100, // Convert to kobo
            'reference' => $reference,
            'callback_url' => route('payment.callback'),
            'metadata' => [
                'payment_id' => $payment->id,
                'apartment_id' => $apartment->id,
                'user_id' => $user->id,
                'type' => $request->type,
            ],
        ]);

        $responseData = $response->json();

        if ($responseData['status']) {
            // Update payment with authorization URL
            $payment->update([
                'meta' => array_merge($payment->meta ?? [], [
                    'authorization_url' => $responseData['data']['authorization_url'],
                    'access_code' => $responseData['data']['access_code'],
                ]),
            ]);

            return response()->json([
                'status' => true,
                'authorization_url' => $responseData['data']['authorization_url'],
                'access_code' => $responseData['data']['access_code'],
                'reference' => $reference,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => $responseData['message'] ?? 'Failed to initialize payment',
        ], 400);
    }

    /**
     * Handle Paystack callback
     */
    public function callback(Request $request)
    {
        $reference = $request->query('reference');

        if (!$reference) {
            return redirect()->route('apartments')->with('error', 'Invalid payment reference');
        }

        // Verify payment with Paystack
        $payment = $this->verifyPayment($reference);

        if ($payment['status']) {
            return redirect()->route('payment.success', ['reference' => $reference])
                ->with('success', 'Payment completed successfully');
        }

        return redirect()->route('apartments')
            ->with('error', 'Payment verification failed');
    }

    /**
     * Verify payment with Paystack
     */
    public function verifyPayment($reference)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.paystack.secret_key'),
            'Content-Type' => 'application/json',
        ])->get("https://api.paystack.co/transaction/verify/{$reference}");

        $responseData = $response->json();

        if ($responseData['status'] && $responseData['data']['status'] === 'success') {
            $paymentData = $responseData['data'];
            
            // Find payment record
            $payment = HousePayment::where('reference', $reference)->first();

            if ($payment && $payment->status === 'pending') {
                // Update payment status
                $payment->update([
                    'status' => 'success',
                    'meta' => array_merge($payment->meta ?? [], [
                        'paystack_response' => $paymentData,
                        'verified_at' => now(),
                        'channel' => $paymentData['channel'] ?? null,
                        'gateway_response' => $paymentData['gateway_response'] ?? null,
                    ]),
                ]);

                // Update apartment status if initial payment
                if ($payment->mode === 'initial') {
                    $apartment = $payment->apartment;
                    $apartment->update([
                        'status' => 'booked',
                        'tenant_id' => $payment->user_id,
                    ]);
                }

                // Send notification (will be implemented in notification system)
                // event(new PaymentCompleted($payment));

                return [
                    'status' => true,
                    'payment' => $payment,
                    'message' => 'Payment verified successfully',
                ];
            }
        }

        return [
            'status' => false,
            'message' => $responseData['message'] ?? 'Payment verification failed',
        ];
    }

    /**
     * Handle Paystack webhook
     */
    public function webhook(Request $request)
    {
        $payload = $request->all();
        $hash = $request->header('X-Paystack-Signature');

        // Verify webhook signature
        $secret = config('services.paystack.secret_key');
        $computedHash = hash_hmac('sha512', $request->getContent(), $secret);

        if ($hash !== $computedHash) {
            Log::warning('Invalid Paystack webhook signature', [
                'received' => $hash,
                'computed' => $computedHash,
            ]);
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $event = $payload['event'];
        $data = $payload['data'];

        switch ($event) {
            case 'charge.success':
                $this->handleChargeSuccess($data);
                break;
            case 'charge.failed':
                $this->handleChargeFailed($data);
                break;
            case 'transfer.success':
                $this->handleTransferSuccess($data);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Handle successful charge
     */
    protected function handleChargeSuccess($data)
    {
        $reference = $data['reference'];
        $payment = HousePayment::where('reference', $reference)->first();

        if ($payment && $payment->status === 'pending') {
            $payment->update([
                'status' => 'success',
                'meta' => array_merge($payment->meta ?? [], [
                    'webhook_data' => $data,
                    'webhook_processed_at' => now(),
                ]),
            ]);

            // Update apartment if needed
            if ($payment->mode === 'initial') {
                $apartment = $payment->apartment;
                $apartment->update([
                    'status' => 'booked',
                    'tenant_id' => $payment->user_id,
                ]);
            }
        }
    }

    /**
     * Handle failed charge
     */
    protected function handleChargeFailed($data)
    {
        $reference = $data['reference'];
        $payment = HousePayment::where('reference', $reference)->first();

        if ($payment) {
            $payment->update([
                'status' => 'failed',
                'meta' => array_merge($payment->meta ?? [], [
                    'failure_reason' => $data['gateway_response'] ?? 'Payment failed',
                    'webhook_data' => $data,
                ]),
            ]);
        }
    }

    /**
     * Handle transfer success (for refunds)
     */
    protected function handleTransferSuccess($data)
    {
        // Handle refunds if needed
        Log::info('Transfer successful', ['data' => $data]);
    }

    /**
     * Calculate payment amount based on type
     */
    protected function calculateAmount(Apartment $apartment, string $type, $requestedAmount = null)
    {
        return match($type) {
            'initial' => $apartment->monthly_price + ($apartment->cg_price * 0.3) + (($apartment->cg_price * 0.05) * 2),
            'rent' => $requestedAmount ?? $apartment->monthly_price,
            'deposit' => $apartment->cg_price * 0.3,
            default => $requestedAmount ?? $apartment->monthly_price,
        };
    }

    /**
     * Show payment success page
     */
    public function success(Request $request)
    {
        $reference = $request->query('reference');
        $payment = HousePayment::where('reference', $reference)
            ->with(['apartment', 'user'])
            ->firstOrFail();

        return Inertia::render('Payments/Success', [
            'payment' => $payment,
        ]);
    }

    /**
     * Get payment history
     */
    public function history(Request $request)
    {
        $user = Auth::user();
        
        $payments = HousePayment::where('user_id', $user->id)
            ->with(['apartment'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Payments/History', [
            'payments' => $payments,
        ]);
    }

    /**
     * Generate payment receipt
     */
    public function receipt($id)
    {
        $payment = HousePayment::where('id', $id)
            ->where('user_id', Auth::id())
            ->with(['apartment', 'user'])
            ->firstOrFail();

        return Inertia::render('Payments/Receipt', [
            'payment' => $payment,
        ]);
    }
}

