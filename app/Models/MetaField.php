<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaField extends Model
{
    use HasFactory;

    protected $fillable = ['location', 'name', 'type', 'options', 'is_required'];

    protected $casts = [
        'options' => 'array', // Automatically casts JSON options to array
        'is_required' => 'boolean',
    ];
}
