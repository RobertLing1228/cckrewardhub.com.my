<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
class UsersSeeder extends Seeder
{
    public function run()
    {
        DB::table('user')->insert([
            [
                'userID' => 1,
                'memberID' => '5600519981',
                'phoneNumber' => '+60109695599'
            ],
            [
                'userID' => 2,
                'memberID' => '1111111113',
                'phoneNumber' => '1111111113'
            ],
            [
                'userID' => 3,
                'memberID' => '1111111111',
                'phoneNumber' => '+60111111111'
            ],
            [
                'userID' => 4,
                'memberID' => '1212121212',
                'phoneNumber' => '+60109642680'
            ],
            [
                'userID' => 6,
                'memberID' => '1231231231',
                'phoneNumber' => '+60125551234'
            ],
            [
                'userID' => 8,
                'memberID' => '1212312312',
                'phoneNumber' => '+60198676474'
            ],
            [
                'userID' => 9,
                'memberID' => '2222222222',
                'phoneNumber' => '+60138272572'
            ],
        ]);
    }
}
