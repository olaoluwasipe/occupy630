<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'fullname' => $this->fullname,
            'fname' => $this->fname,
            'lname' => $this->lname,
            'email' => $this->email,
            'type' => $this->type,
            'phonenumber' => $this->phonenumber,
            'profile_photo_path' => $this->profile_photo_path,
            'created_at' => $this->created_at?->toDateTimeString(),
        ];
    }
}



