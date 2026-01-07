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

    protected $appends = ['owner'];

    public function getOwnerAttribute() {
        return $this->owner()->first();
    }

    public function users(){
        return $this->hasMany(User::class, 'company_id');
    }

    public function owner () {
        return $this->belongsTo(User::class,'user_id');
    }
}
