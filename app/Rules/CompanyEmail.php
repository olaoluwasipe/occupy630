<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class CompanyEmail implements ValidationRule
{
    /**
     * List of common email providers to block.
     *
     * @var array
     */
    protected $blockedDomains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'aol.com',
        'outlook.com',
        // Add more if needed
    ];

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $domain = substr(strrchr($value, "@"), 1);
        if (in_array($domain, $this->blockedDomains)) {
            $fail('The :attribute must be a company email address and not a free provider.');
        }
    }
}
