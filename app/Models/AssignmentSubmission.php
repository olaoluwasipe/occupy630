<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AssignmentSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id',
        'user_id',
        'file_id',
        'text',
        'tutor_feedback',
        'grade',
    ];

    public function assignment () {
        return $this->belongsTo(Assignment::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }

    public function file () {
        return $this->belongsTo(File::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function notifyStudents()
    {
        // Fetch students enrolled in the course associated with this meeting
        $tutors = $this->cohort->tutor;

        $notifications = [];

        foreach ($tutors as $tutor) {
            $notifications[] = [
                'notifiable_id' => $this->id,
                'notifiable_type' => AssignmentSubmission::class,
                'type' => 'SubmissionNotification',
                'data' => json_encode(['message' => 'A student just submitted their assignment.']),
                'user_id' => $tutor->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert notifications in bulk
        DB::table('notifications')->insert($notifications);
    }
}
