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
        Schema::table('users', function (Blueprint $table) {
            $table->index('email');
            $table->index('type');
            $table->index('company_id');
        });

        Schema::table('apartments', function (Blueprint $table) {
            $table->index('tenant_id');
            $table->index('landlord_id');
            $table->index('status');
            $table->index('category_id');
        });

        Schema::table('house_payments', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('apartment_id');
            $table->index('status');
            $table->index('reference');
            $table->index(['user_id', 'status']);
        });

        Schema::table('chats', function (Blueprint $table) {
            $table->index('sender_id');
            $table->index('receiver_id');
            $table->index(['sender_id', 'receiver_id']);
            $table->index('read');
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->index('user_id');
            // Note: read_at is TEXT, cannot be indexed directly
            // Will be fixed in a separate migration to change column type
            // $table->index('read_at');
            // $table->index(['user_id', 'read_at']);
        });

        Schema::table('assignments', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('cohort_id');
        });

        Schema::table('assignment_submissions', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('assignment_id');
        });

        Schema::table('meetings', function (Blueprint $table) {
            $table->index('cohort_id');
            $table->index('user_id');
            $table->index('date');
        });

        Schema::table('forums', function (Blueprint $table) {
            $table->index('cohort_id');
            $table->index('user_id');
            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['email']);
            $table->dropIndex(['type']);
            $table->dropIndex(['company_id']);
        });

        Schema::table('apartments', function (Blueprint $table) {
            $table->dropIndex(['tenant_id']);
            $table->dropIndex(['landlord_id']);
            $table->dropIndex(['status']);
            $table->dropIndex(['category_id']);
        });

        Schema::table('house_payments', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['apartment_id']);
            $table->dropIndex(['status']);
            $table->dropIndex(['reference']);
            $table->dropIndex(['user_id', 'status']);
        });

        Schema::table('chats', function (Blueprint $table) {
            $table->dropIndex(['sender_id']);
            $table->dropIndex(['receiver_id']);
            $table->dropIndex(['sender_id', 'receiver_id']);
            $table->dropIndex(['read']);
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            // $table->dropIndex(['read_at']);
            // $table->dropIndex(['user_id', 'read_at']);
        });

        Schema::table('assignments', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['cohort_id']);
        });

        Schema::table('assignment_submissions', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['assignment_id']);
        });

        Schema::table('meetings', function (Blueprint $table) {
            $table->dropIndex(['cohort_id']);
            $table->dropIndex(['user_id']);
            $table->dropIndex(['date']);
        });

        Schema::table('forums', function (Blueprint $table) {
            $table->dropIndex(['cohort_id']);
            $table->dropIndex(['user_id']);
            $table->dropIndex(['parent_id']);
        });
    }
};
