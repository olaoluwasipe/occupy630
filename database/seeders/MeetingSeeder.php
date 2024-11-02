<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('meetings')->insert([
            'title' => 'Fullstack Web Development',
            'cohort_id' => 2,
            'user_id' => 2,
            'title' => 'Fullstack Web Development',
            'description' => 'Click to join the meeting',
            'link' => 'https://us04web.zoom.us/j/72692049583?pwd=BhDJ16vBGgpabG8n6eCxEXE30raH5L.1#success',
            'date' => '04 July, 2024',
            'duration_time' => '5:00PM to 7:00PM',
            'created_at' => now(),
            'updated_at' => now(),

        ]);
    }
}
