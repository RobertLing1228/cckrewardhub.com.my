<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            CategoriesSeeder::class,
            BranchesSeeder::class,
            ProductsSeeder::class,
            BranchProductSeeder::class,
            WheelRewardsSeeder::class,
            ResetTimesSeeder::class,
            UsersSeeder::class,
            BannersSeeder::class,
            QrCodesSeeder::class,
            ReceipesSeeder::class,
            VouchersSeeder::class,
        ]);
    }
}
