<?php

namespace App\Models;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = [
        'landlord_id',
        'title',
        'slug',
        'description',
        'price',
        'cg_price',
        'monthly_price',
        'address',
        'city',
        'state',
        'country',
        'zip_code',
        'latitude',
        'longitude',
        'category_id',
        'bedrooms',
        'bathrooms',
        'area',
        'amenities',
        'availability',
        'status',
        'featured',
        'tenant_id',
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

    protected $casts = [
        'amenities' => 'array',
    ];

    public function apartmentCategory() {
        return $this->belongsTo(ApartmentCategory::class);
    }

    public function apartmentImages() {
        return $this->hasMany(ApartmentImage::class);
    }

    public function landlord() {
        return $this->belongsTo(User::class, 'landlord_id');
    }

    public function tenant() {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function apartmentAttributes () {
        return $this->hasMany(ApartmentAttribute::class, 'id', 'attributes');
    }

    // public function rentalHistory() {
    //     return $this->hasMany(RentalHistory::class);
    // }
}