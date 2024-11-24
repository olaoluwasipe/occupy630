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
        Schema::table('files', function (Blueprint $table) {
            // $table->dropForeign('files_assignment_id_foreign');
            // $table->dropForeign('files_cohort_id_foreign');
            // $table->dropForeign('files_tenant_id_foreign');
            // $table->dropForeign('files_apartment_id_foreign');
            // $table->dropColumn('apartment_id');

            // $table->dropColumn('assignment_id');
            $table->dropColumn('tenant_id');
            // $table->dropColumn('cohort_id');
            $table->foreignId('tenant_id')->constrained('users')->nullable()->after('user_id');
            $table->foreignId('apartment_id')->references('id')->on('apartments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn('tenant_id');
        });
    }
};
