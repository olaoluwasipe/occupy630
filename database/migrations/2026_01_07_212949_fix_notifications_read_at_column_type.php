<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Change read_at from TEXT to TIMESTAMP
        // Using raw SQL to handle the type change
        DB::statement('ALTER TABLE notifications MODIFY COLUMN read_at TIMESTAMP NULL');
        
        // Now add the indexes
        Schema::table('notifications', function (Blueprint $table) {
            try {
                $table->index('read_at');
            } catch (\Exception $e) {
                // Index might already exist, continue
            }
            
            try {
                $table->index(['user_id', 'read_at']);
            } catch (\Exception $e) {
                // Index might already exist, continue
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Drop indexes
            try {
                $table->dropIndex('notifications_read_at_index');
            } catch (\Exception $e) {
                // Index might not exist
            }
            
            try {
                $table->dropIndex('notifications_user_id_read_at_index');
            } catch (\Exception $e) {
                // Index might not exist
            }
        });
        
        // Change back to TEXT (optional - comment out if you don't want to revert column type)
        // DB::statement('ALTER TABLE notifications MODIFY COLUMN read_at TEXT NULL');
    }
};
