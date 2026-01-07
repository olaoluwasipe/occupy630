<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'quote_id',
        'attachments',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function sent () {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function received () {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function quote () {
        return $this->belongsTo(Chat::class, 'quote_id');
    }

    public function attachments () {
        return $this->hasMany(Chat::class, 'quote_id');
    }

    public function notifications () {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
