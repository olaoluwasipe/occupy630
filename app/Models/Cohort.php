<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cohort extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'course_id',
        'start_date',
        'end_date',
    ];

    public function tutor() {
        return $this->belongsToMany(User::class, 'cohort_tutor', 'cohort_id', 'user_id');
    }

    public function students () {
        return $this->belongsToMany(User::class, 'cohort_student', 'cohort_id', 'user_id');
    }

    public function course () {
        return $this->belongsTo(Course::class);
    }

    public function assignments() {
        return $this->hasMany(Assignment::class);
    }

    public function meetings () {
        return $this->hasMany(Meeting::class);
    }

    public function files () {
        return $this->hasMany(File::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function activities () {
        return $this->hasMany(Activity::class, 'cohort_id');
    }

    public function forums () {
        return $this->hasMany(Forum::class, 'cohort_id')->whereNull('parent_id');
    }
}
