<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ExistingMember;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;

class ExistingMembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('exist_member')->insert([
            [
                'existsmemID' => 1,
                'memberID' => '5600519981',
                'phoneNumber' => '+60109695599'
            ],
            [
                'existsmemID' => 2,
                'memberID' => '1111111111',
                'phoneNumber' => '+60111111111'
            ],
            [
                'existsmemID' => 3,
                'memberID' => '1111111112',
                'phoneNumber' => '1111111112'
            ],
            [
                'existsmemID' => 4,
                'memberID' => '1111111113',
                'phoneNumber' => '1111111113'
            ],
        ]);
    }
}
