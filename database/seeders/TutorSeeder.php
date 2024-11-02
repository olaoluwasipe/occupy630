<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('users')->insert([
        //     'name' => 'Tutor 1',
        //     'email' => 'tutor1@example.com',
        //     'password' => bcrypt('password'),
        //     'type' => 'tutor',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        // DB::table('users')->insert([
        //     'name' => 'Tutor 2',
        //     'email' => 'tutor2@example.com',
        //     'password' => bcrypt('password'),
        //     'type' => 'tutor',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        // DB::table('users')->insert([
        //     'name' => 'Student 1',
        //     'email' => 'student1@example.com',
        //     'password' => bcrypt('password'),
        //     'type' => 'student',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        DB::table('cohort_tutor')->insert([
            'cohort_id' => 2,
            'user_id' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('cohort_student')->insert([
            'cohort_id' => 2,
            'user_id' => 4,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
