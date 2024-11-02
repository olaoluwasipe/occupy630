<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'cohort_id',
        'user_id',
        'attachments',
        'status',
        'category',
        'parent_id',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function cohort() {
        return $this->belongsTo(Cohort::class);
    }

    public function replies() {
        return $this->hasMany(Forum::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Forum::class, 'parent_id');
    }
}
