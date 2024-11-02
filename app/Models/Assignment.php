<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'cohort_id',
        'user_id',
    ];



    public function getStatusAttribute()
    {
        // Example logic for computing status
        if ($this->due_date < now()) {
            return 'Upcoming';
        } elseif ($this->due_date > now()) {
            return 'Late';
        } else {
            return 'Ongoing';
        }
    }

    public function cohort () {
        return $this->belongsTo(Cohort::class);
    }

    public function tutor () {
        return $this->belongsTo(User::class);
    }

    public function files () {
        return $this->hasMany(File::class);
    }
    
    public function submissions () {
        return $this->hasMany(AssignmentSubmission::class);
    }

    public function submittedUsers()
    {
        return $this->submissions()->with('user')->get()->pluck('user');
    }

    public function nonSubmittedUsers()
    {
        $submittedUsers = $this->submittedUsers()->pluck('id')->toArray();
        return $this->cohort->students()->whereNotIn('users.id', $submittedUsers)->get();
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function activities() 
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    public function notifyStudents()
    {
        // Fetch students enrolled in the course associated with this meeting
        $students = $this->cohort->students;

        $notifications = [];

        foreach ($students as $student) {
            $notifications[] = [
                'notifiable_id' => $this->id,
                'notifiable_type' => Assignment::class,
                'type' => 'AssignmentNotification',
                'data' => json_encode(['message' => 'A new assignment has been placed on the group\'s calendar.']),
                'user_id' => $student->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert notifications in bulk
        DB::table('notifications')->insert($notifications);
    }

    public function addActivity($userid)
    {
        // Fetch students enrolled in the course associated with this meeting
        // $tutor = $this->cohort->tutor;

        $notifications = [];

        // foreach ($students as $student) {
            $notifications[] = [
                'subject_id' => $this->id,
                'subject_type' => Assignment::class,
                'type' => 'Assignment',
                'data' => 'New Assignment added to the calendar',
                'user_id' => $userid,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        // }

        // Insert notifications in bulk
        DB::table('activities')->insert($notifications);
    }

}
