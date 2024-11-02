<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'duration_time',
        'cohort_id',
        'user_id',
        'link'
    ];

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function cohort() {
        return $this->belongsTo(Cohort::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function attendance () {
        return $this->hasMany(Attendance::class);
    }

    public function notifyStudents()
    {
        // Fetch students enrolled in the course associated with this meeting
        $students = $this->cohort->students;

        $notifications = [];

        foreach ($students as $student) {
            $notifications[] = [
                'notifiable_id' => $this->id,
                'notifiable_type' => Meeting::class,
                'type' => 'MeetingNotification',
                'data' => json_encode(['message' => 'A new meeting has been scheduled.']),
                'user_id' => $student->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert notifications in bulk
        DB::table('notifications')->insert($notifications);
    }

    public function addActivity($userid, $cohort_id)
    {
        // Fetch students enrolled in the course associated with this meeting
        // $tutor = $this->cohort->tutor;

        $notifications = [];

        // foreach ($students as $student) {
            $notifications[] = [
                'subject_id' => $this->id,
                'subject_type' => Meeting::class,
                'type' => 'Meeting',
                'data' => 'New Meeting added to the calendar',
                'user_id' => $userid,
                'cohort_id' => $cohort_id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        // }

        // Insert notifications in bulk
        DB::table('activities')->insert($notifications);
    }
}
