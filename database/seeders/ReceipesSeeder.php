<?php

namespace Database\Seeders;
use DB;
use File;
use Illuminate\Database\Seeder;
class ReceipesSeeder extends Seeder
{
    /**
     * Seed the application's database with QR codes.
     */
    public function run(): void
    {
        $json = File::get(database_path('seeders/jsons/recipes.json'));
        $data = json_decode($json, true)['data'] ?? [];
        DB::table('recipes')->insert($data);
    }
}
