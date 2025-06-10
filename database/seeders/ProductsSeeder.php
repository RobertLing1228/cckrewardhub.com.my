<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

class ProductsSeeder extends Seeder
{
    public function run()
    {
        $json = File::get(database_path('seeders/jsons/products.json'));
        $data = json_decode($json, true)['data'] ?? [];
        DB::table('products')->insert($data);
    }
}
