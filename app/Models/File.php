<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_name',
        'file_type',
        'file_size',
        'file_path',
        'cohort_id',
        'user_id',
        'assignment_id',
    ];

    public function assignment () {
        return $this->belongsTo(Assignment::class);
    }

    public function cohort () {
        return $this->belongsTo(Cohort::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
