<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::updateOrCreate(
            ['adminID' => '1'], // Ensures no duplicate entry
            [
                'name' => 'admin',
                'password' => Hash::make('admin123'), // Hash password
            ]
        );
    }
}

