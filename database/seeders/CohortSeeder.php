<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CohortSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cohorts')->insert([
            'course_id' => 1,
            'name' => 'Cohort 1',
            'start_date' => '2024-07-01',
            'end_date' => '2024-07-31',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('cohorts')->insert([
            'course_id' => 2,
            'name' => 'Cohort 2',
            'start_date' => '2024-07-01',
            'end_date' => '2024-07-31',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
