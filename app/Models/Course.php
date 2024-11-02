<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'outline',
        'image',
        'description',
        'objectives'
    ];

    protected $casts = [
        'outline' => 'array',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($course) {
            $course->slug = self::createUniqueSlug($course->title);
        });
    }

    private static function createUniqueSlug($name)
    {
        // Generate initial slug
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        // Check for existing slugs and adjust if necessary
        while (Course::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        return $slug;
    }

    public function cohorts() {
        return $this->hasMany(Cohort::class, 'course_id');
    }

    public function modules() {
        return $this->hasMany(CourseModule::class, 'course_id');
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
