<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $fillable = [
        "apartment_id",
        "user_id",
        "approver_id",
        "status"
    ];

    public function user() {
        return $this->belongsTo(User::class, "user_id");
    }

    public function approval() {
        return $this->belongsTo(User::class, "approver_id");
    }

    public function apartment() {
        return $this->belongsTo(Apartment::class, "apartment_id");
    }

    public function scopeApproved($query) {
        return $query->where("status",  self::getStatusTextAttribute('approved'));
    }

    public function scopeUnapproved($query) {
        return $query->where("status", self::getStatusTextAttribute('declined'));
    }

    public function scopePending($query) {
        return $query->where("status", self::getStatusTextAttribute('pending'));
    }

    const STATUS_MAP = [
        "1" => "approved",
        "0" => "declined",
        "2" => "pending"

    ];

    public static function getStatusAttribute($value) {
        return self::STATUS_MAP[$value] ?? 0;
    }

    public static function getStatusTextAttribute($value) {
        return array_search($value, self::STATUS_MAP) ? array_search($value, self::STATUS_MAP) : "Unknown";
    }
}
