<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('assignments')->insert([
            [
                'title' => 'Introduction To SQA',
                'description' => '<p>
                This assignment aims to introduce you to the fundamental concepts of Software Quality Assurance (SQA). You will explore the importance of SQA in the software development lifecycle, understand key quality assurance practices, and analyze the role of SQA in delivering high-quality software products.

                Instructions:
                Write a comprehensive report on Software Quality Assurance.
                The report should be between 1500 to 2000 words.
                Include at least three reputable sources and cite them using APA style.
                Structure your report with an introduction, main body, and conclusion.
                Submit your report as a PDF file.
                Name your file in the format: LastName_FirstName_SQA_Report.pdf.
                </p>',
                'cohort_id' => 2,
                'user_id' => 2,
                'due_date' => '2023-07-04 15:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Assignment 2',
                'description' => 'Assignment 2 description',
                'cohort_id' => 2,
                'user_id' => 2,
                'due_date' => '2023-07-04 15:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Assignment 3',
                'description' => 'Assignment 3 description',
                'cohort_id' => 3,
                'user_id' => 3,
                'due_date' => '2023-07-04 15:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
