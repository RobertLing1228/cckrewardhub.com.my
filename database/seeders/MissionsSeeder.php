<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
class MissionsSeeder extends Seeder
{
    public function run()
    {
        DB::table('missions')->insert([
            [
                'id' => 1,
                'mission_name' => 'Scan a QR Code',
                'mission_description' => 'Scan any product QR code using the app scanner.',
                'mission_goal' => 1,
                'mission_image' => json_encode(['images/scanqr.png']),
            ],
            [
                'id' => 2,
                'mission_name' => 'Play Match-3 Game',
                'mission_description' => 'Complete one round of the Match-3 game.',
                'mission_goal' => 1,
                'mission_image' => json_encode(['images/match3.png']),
            ],
            [
                'id' => 3,
                'mission_name' => 'Spin the Prize Wheel',
                'mission_description' => 'Spin the daily prize wheel once.',
                'mission_goal' => 1,
                'mission_image' => json_encode(['images/spin.png']),
            ],
        ]);
    }
}
