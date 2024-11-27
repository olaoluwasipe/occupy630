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
        Schema::table('apartments', function (Blueprint $table) {
            $table->decimal('six_months_rent',10,2)->default(0)->after('monthly_rent');
            $table->decimal('service_charge',10,2)->default(0)->after('monthly_rent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apartments', function (Blueprint $table) {
            $table->dropColumn('six_months_rent');
            $table->dropColumn('service_charge');
        });
    }
};
