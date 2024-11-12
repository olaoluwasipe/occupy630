<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',

            // Attachments array, each file within it must meet specific requirements
            'attachments' => 'required|array',
            // 'attachments.*' => 'file|mimes:pdf,doc,docx,jpg,jpeg,png,gif|max:2048',

            'address' => 'required|string',

            // Ensure category exists in the categories table
            'category' => 'required|integer',
            // 'category' => 'required|integer|exists:apartment_categories,id',

            // Location array with specific fields required
            'location' => 'required|array',
            'location.state' => 'required|string',
            'location.lga' => 'required|string',

            'bathrooms' => 'required|integer',
            'bedrooms' => 'required|integer',

            // Amenities array, with each item expected to be a string
            'amenities' => 'required|array',
            'amenities.*' => 'string',

            // Availability array (can further specify individual fields if needed)
            'availability' => 'required|string',

        ];
    }
}
