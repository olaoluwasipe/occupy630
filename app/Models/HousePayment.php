<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class HousePayment extends Model
{
    use Notifiable;
    protected $fillable = [
        'apartment_id',
        'approval_id',
        'user_id',
        'amount',
        'due_date',
        'date',
        'method',
        'reference',
        'note',
        'meta',
        'type',
        'mode',
        'status',
    ];

    protected $casts = [
        'meta' => 'array',
        'date' => 'date',
        'due_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public static function boot() {
        parent::boot();

        static::creating(function ($payment) {
            $payment->reference = 'REF-' . Str::random(10);
        });
    }

    protected $appends = ['apartment', 'tenant'];

    public function getApartmentAttribute()
    {
        return $this->apartment()->first();
    }

    public function getTenantAttribute() {
        return $this->user;
    }

    public function apartment() {
        return $this->belongsTo(Apartment::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function approval () {
        return $this->belongsTo(Approval::class);
    }

    public function notifications () {
        return $this->morphMany(Notification::class,'notifiable');
    }
}
