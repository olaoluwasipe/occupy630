<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('courses')->insert([
            'title' => 'Software Quality Assurance',
            'slug' =>'sqa',
            'description' => 'This is the description of course 2',
            'objectives' => json_encode([
                'Objective 1',
                'Objective 2',
                'Objective 3',
            ]),
            'outline' => json_encode([
                'Objective 1',
                'Objective 2',
                'Objective 3',
            ]),
        ]);
        DB::table('courses')->insert([
            'title' => 'Fullstack Web Development',
            'slug' =>'fullstack-web-development',
            'description' => 'This is the description of course 2',
            'objectives' => json_encode([
                'Objective 1',
                'Objective 2',
                'Objective 3',
            ]),
            'outline' => json_encode([
                'Objective 1',
                'Objective 2',
                'Objective 3',
            ]),
        ]);
    }
}
