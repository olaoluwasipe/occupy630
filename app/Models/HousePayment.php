<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HousePayment extends Model
{
    protected $fillable = [
        'apartment_id',
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

    public function apartment() {
        return $this->belongsTo(Apartment::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
