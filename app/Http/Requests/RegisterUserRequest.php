<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\CompanyEmail;
use App\Rules\UniqueIf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterUserRequest extends FormRequest
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
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                new UniqueIf('users', 'email', 'register_code', null),
                function ($attribute, $value, $fail) {
                    // Skip CompanyEmail validation if type is landlord
                    if (request()->input('type') === 'employer') {

                        $rule = new CompanyEmail;
                        return $rule->validate($attribute, $value, $fail);
                        // $rule->passes($attribute, $value) || $fail($rule->message());
                    }
                },
            ],
            'type' => 'required|string|max:255|in:landlord,employer,employee',
            'password' => ['required', 'confirmed', Password::defaults()],
            'code' => 'sometimes|string|nullable' // Include any other fields you need
        ];
    }

    /**
     * Custom messages for validation errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'This email address is already registered.',
            'type.in' => 'The selected type is invalid.',
            'password.confirmed' => 'The password confirmation does not match.',
            // Add other custom messages as needed
        ];
    }
}
