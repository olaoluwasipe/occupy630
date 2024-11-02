<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'logo',
        'website_name',
        'website_url',
        'support_email',
        'contact_number',
    ];
}
