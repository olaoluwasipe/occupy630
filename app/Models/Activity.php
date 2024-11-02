<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'subject_type',
        'type',
        'data',
        'read_at',
        'user_id',
        'cohort_id',
    ];

    public function subject()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function addActivity($description, $type, $class, $data)
    {
        // Fetch students enrolled in the course associated with this meeting
        $students = $this->cohort->students;

        $notifications = [];

        foreach ($students as $student) {
            $notifications[] = [
                'subject_id' => $this->id,
                'subject_type' => $class,
                'type' => $type,
                'data' => $data,
                'user_id' => $student->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert notifications in bulk
        DB::table('activities')->insert($notifications);
    }
}
