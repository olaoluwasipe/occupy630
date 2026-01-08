<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApartmentResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'address' => $this->address,
            'state' => $this->state,
            'city' => $this->city,
            'price' => $this->price,
            'monthly_price' => $this->monthly_price,
            'monthly_rent' => $this->monthly_rent,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'status' => $this->status,
            'availability' => $this->availability,
            'amenities' => $this->amenities,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'landlord' => new UserResource($this->whenLoaded('landlord')),
            'tenant' => new UserResource($this->whenLoaded('tenant')),
            'category' => new ApartmentCategoryResource($this->whenLoaded('category')),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}



