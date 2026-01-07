<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'gender',
        'type',
        'phonenumber',
        'nationality',
        'address',
        'profile_photo',
        'register_code',
        'company_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

     /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function company () {
        return $this->hasOne(Company::class, 'user_id');
    }

    public function employedCompany() {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function ownedApartments () {
        return $this->hasMany(Apartment::class, 'landlord_id');
    }

    public function rentedApartments () {
        return $this->hasMany(Apartment::class, 'tenant_id');
    }

    public function studentcohort() {
        return $this->belongsToMany(Cohort::class, 'cohort_student', 'user_id', 'cohort_id');
    }

    public function tutorcohort() {
        return $this->belongsToMany(Cohort::class, 'cohort_tutor', 'user_id', 'cohort_id');
    }

    public function assignments() {
        return $this->hasMany(Assignment::class, 'user_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function activities() {
        return $this->hasMany(Activity::class, 'user_id');
    }

    public function forums() {
        return $this->hasMany(Forum::class, 'user_id');
    }

    public function assignmentSubmissions() {
        return $this->hasMany(AssignmentSubmission::class, 'user_id');
    }

    public function chatsSent() {
        return $this->hasMany(Chat::class, 'sender_id');
    }

    public function chatsReceived() {
        return $this->hasMany(Chat::class, 'receiver_id');
    }

    public function attendances() {
        return $this->hasMany(Attendance::class, 'user_id');
    }

    public function meetings() {
        return $this->hasMany(Meeting::class, 'user_id');
    }

    public function inquiries() {
        return $this->hasMany(Inquiry::class, 'user_id');
    }

    public function housePayments() {
        return $this->hasMany(HousePayment::class, 'user_id');
    }
}
