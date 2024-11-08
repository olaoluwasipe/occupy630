<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'meeting_id',
        'status'
    ];

    public function meeting () {
        return $this->belongsTo(Meeting::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }
}
