<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class WheelRewardsSeeder extends Seeder
{
    public function run()
    {

        DB::table('wheel_rewards')->insert([
            [
                'id' => 1,
                'reward_type' => 'voucher',
                'voucher_value' => 2.00,
                'probability' => 0.1
            ],
            [
                'id' => 2,
                'reward_type' => 'voucher',
                'voucher_value' => 3.00,
                'probability' => 0.15
            ],
            [
                'id' => 3,
                'reward_type' => 'loss',
                'voucher_value' => null,
                'probability' => 0.3
            ],
            [
                'id' => 4,
                'reward_type' => 'voucher',
                'voucher_value' => 5.00,
                'probability' => 0.1
            ],
            [
                'id' => 5,
                'reward_type' => 'loss',
                'voucher_value' => null,
                'probability' => 0.2
            ],
            [
                'id' => 6,
                'reward_type' => 'loss',
                'voucher_value' => null,
                'probability' => 0.15
            ],
        ]);

    }
}
