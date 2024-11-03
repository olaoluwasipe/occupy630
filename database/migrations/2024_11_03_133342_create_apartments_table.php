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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('landlord_id')->references('id')->on('users');
            $table->string('title');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->decimal('price', 40, 2);
            $table->decimal('cg_price', 40, 2);
            $table->decimal('monthly_price', 40, 2);
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('zip_code')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->foreignId('category_id')->references('id')->on('apartment_categories');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->integer('area')->nullable();
            $table->text('amenities')->nullable();
            $table->enum('availability', ['available', 'unavailable']);
            $table->string('status');
            $table->boolean('featured')->default(false);
            $table->foreignId('tenant_id')->nullable()->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
