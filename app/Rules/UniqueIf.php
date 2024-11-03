<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UniqueIf implements ValidationRule
{
    protected string $table;
    protected string $column;
    protected $conditionColumn;
    protected $conditionValue;

    public function __construct(string $table, string $column, $conditionColumn, $conditionValue)
    {
        $this->table = $table;
        $this->column = $column;
        $this->conditionColumn = $conditionColumn;
        $this->conditionValue = $conditionValue;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exists = DB::table($this->table)
            ->where($this->column, $value)
            ->where($this->conditionColumn, $this->conditionValue)
            ->exists();

        if ($exists) {
            $fail("The :attribute has already been taken.");
        }
    }
}
