<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('course_modules')->insert([
            'course_id' => 1,
            'title' => 'Module One: Introduction to Software Quality Assurance',
            'description' => '<p>Lesson 1: Course Introduction</p><br><p>Lesson 2: Key Concepts in SQA</p><br><p>Lesson 3: QA vs QC</p>',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('course_modules')->insert([
            'course_id' => 1,
            'title' => 'Module Two: Quality Models and Standards',
            'description' => '<p>Lesson 1: Course Introduction</p><br><p>Lesson 2: Key Concepts in SQA</p><br><p>Lesson 3: QA vs QC</p>',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('course_modules')->insert([
            'course_id' => 1,
            'title' => 'Module Three: Test Planning and Documentation',
            'description' => '<p>Lesson 1: Course Introduction</p><br><p>Lesson 2: Key Concepts in SQA</p><br><p>Lesson 3: QA vs QC</p>',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
