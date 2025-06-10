<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['categoryID' => 1, 'categoryName' => 'CCK Products'],
            ['categoryID' => 2, 'categoryName' => 'Vegetables & Fruits'],
            ['categoryID' => 3, 'categoryName' => 'Organic'],
            ['categoryID' => 4, 'categoryName' => 'Dairy & Chilled Juice'],
            ['categoryID' => 5, 'categoryName' => 'Eggs Tofu & Deli'],
            ['categoryID' => 6, 'categoryName' => 'Meat & Seafood'],
            ['categoryID' => 7, 'categoryName' => 'Frozen Food'],
            ['categoryID' => 8, 'categoryName' => 'Breakfast'],
            ['categoryID' => 9, 'categoryName' => 'Home Baking'],
            ['categoryID' => 10, 'categoryName' => 'Food Cupboard'],
            ['categoryID' => 11, 'categoryName' => 'Beverages & Drinks'],
            ['categoryID' => 12, 'categoryName' => 'Snacks & Confectionery'],
            ['categoryID' => 13, 'categoryName' => 'Household'],
            ['categoryID' => 14, 'categoryName' => 'Kitchen Dining & Home'],
            ['categoryID' => 15, 'categoryName' => 'Baby & Child'],
            ['categoryID' => 16, 'categoryName' => 'Toiletries Health & Beauty'],
            ['categoryID' => 17, 'categoryName' => 'Non-Halal'],
            ['categoryID' => 18, 'categoryName' => 'Beer Wine & Spirits'],
            ['categoryID' => 19, 'categoryName' => 'Pet Care'],
        ]);
    }
}
