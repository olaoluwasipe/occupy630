<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'type',
        'schedule_date',
        'message',
        'apartment_id'
    ];

    public function apartment(){
        $this->belongsTo(Apartment::class, 'apartment_id');
    }
}
