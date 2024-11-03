<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApartmentImage extends Model
{
    protected $fillable = [
        'apartment_id',
        'name',
        'size',
        'type',
        'path',
        'url',
        'main'
    ];
}
