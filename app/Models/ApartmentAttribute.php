<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApartmentAttribute extends Model
{
    protected $fillable = [
        'name',
    ];

    public function apartments() {
        return $this->belongsToMany(Apartment::class);
    }
}
