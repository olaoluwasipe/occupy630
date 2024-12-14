<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meta_fields', function (Blueprint $table) {
            $table->id();
            $table->string('location'); // E.g., 'registration-form', 'login-form'
            $table->string('name'); // Field name (e.g., 'country')
            $table->string('type'); // Field type (e.g., 'text', 'dropdown', 'checkbox')
            $table->text('options')->nullable(); // JSON for options (e.g., for dropdown: ["USA", "Canada"])
            $table->boolean('is_required')->default(false); // Whether the field is required
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meta_fields');
    }
};
