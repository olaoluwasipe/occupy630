<?php

use App\Models\Apartment;
use App\Models\HousePayment;
use App\Notifications\RentReminder;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    // Get today's date
    $today = Carbon::now()->startOfDay();

    // Fetch payments due in 7 days, 2 days, or today
    $payments = HousePayment::whereIn('due_date', [
        $today->copy()->addDays(7)->toDateString(),
        $today->copy()->addDays(2)->toDateString(),
        $today->toDateString(),
    ])->where('status', 'pending')->get();

    foreach ($payments as $payment) {
        $user = $payment->user; // Fetch the user associated with the payment

        if ($user) { // Ensure a user exists for this payment
            $link = route('payment.show', $payment->id); // Generate the payment link

            // Determine the reminder type based on the due date
            $daysToDueDate = Carbon::parse($payment->due_date)->diffInDays($today);

            if ($daysToDueDate === 7) {
                $user->notify(new RentReminder($payment->due_date, $link, '7 days'));
            } elseif ($daysToDueDate === 2) {
                $user->notify(new RentReminder($payment->due_date, $link, '2 days'));
            } elseif ($daysToDueDate === 0) {
                $user->notify(new RentReminder($payment->due_date, $link, 'today'));
            }
        }
    }
})->everyMinute();
