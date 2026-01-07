<!DOCTYPE html>
<html>
<head>
    <title>Invoice PDF</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h1>Invoice #{{ $invoice->reference }}</h1>
    <p>Customer: {{ $invoice->user->fullname }}</p>
    <p>Date Issued: {{ now()->format('Y-m-d') }}</p>
    <p>Due Date: {{ is_string($invoice->due_date) ? $invoice->due_date : $invoice->due_date->format('Y-m-d') }}</p>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoice->meta['prices'] as $desc => $item)
            <tr>
                <td>{{ ucwords( str_replace('_', ' ', $desc ) )?? 'Invoice Payment' }}</td>
                <td>{{ "₦".number_format($item, 2) }}</td>
            </tr>
            @endforeach
            <tr>
                <td>Total</td>
                <td><strong>{{ "₦".number_format($invoice->amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <p>Note: {{$invoice->note}}</p>

    <br><br><br><br>
</body>
</html>
