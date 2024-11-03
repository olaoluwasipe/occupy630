<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'email',
        'business_number',
        'address',
        'phone',
        'url',
        'website',
        'logo',
        'description',
        'user_id',
    ];
}
