<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApartmentCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function apartments() {
        return $this->hasMany(Apartment::class);
    }
}
