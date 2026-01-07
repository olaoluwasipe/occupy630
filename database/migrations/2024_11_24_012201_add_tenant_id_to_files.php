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
            // Check if tenant_id exists before trying to drop it
            if (Schema::hasColumn('files', 'tenant_id')) {
                $table->dropColumn('tenant_id');
            }
            
            // Check if apartment_id exists before trying to drop it
            if (Schema::hasColumn('files', 'apartment_id')) {
                // Drop foreign key first if it exists
                if (Schema::hasColumn('files', 'apartment_id')) {
                    $table->dropForeign(['apartment_id']);
                }
                $table->dropColumn('apartment_id');
            }
        });

        // Now add the columns
        Schema::table('files', function (Blueprint $table) {
            if (!Schema::hasColumn('files', 'tenant_id')) {
                $table->foreignId('tenant_id')->nullable()->constrained('users')->after('user_id');
            }
            if (!Schema::hasColumn('files', 'apartment_id')) {
                $table->foreignId('apartment_id')->nullable()->references('id')->on('apartments')->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            if (Schema::hasColumn('files', 'tenant_id')) {
                $table->dropForeign(['tenant_id']);
                $table->dropColumn('tenant_id');
            }
            if (Schema::hasColumn('files', 'apartment_id')) {
                $table->dropForeign(['apartment_id']);
                $table->dropColumn('apartment_id');
            }
        });
    }
};
