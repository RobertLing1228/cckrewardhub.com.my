<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ResetTimesSeeder extends Seeder
{
    public function run()
    {
        DB::table('reset_times')->insert([
            [
                'id' => 1,
                'game_type' => 'mission',
                'reset_time' => '01:00:00',
                'isWeekly' => 1
            ],
            [
                'id' => 2,
                'game_type' => 'wheel',
                'reset_time' => '01:00:00',
                'isWeekly' => 0
            ],
        ]);
    }
}
