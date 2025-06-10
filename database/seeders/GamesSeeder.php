<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GamesSeeder extends Seeder
{
    public function run()
    {
        DB::table('games')->insert([
            [
                'gameID' => 1,
                'title' => 'Match 3',
                'description' => 'A game where you swap tiles to match and score! Earn at least 300 points to get a reward!',
                'image' => 'images/match3-banner.png',
                'gameLink' => 'games/match3-gamever4/index.html'
            ],
        ]);
    }
}
