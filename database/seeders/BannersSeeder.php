<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BannersSeeder extends Seeder
{
    public function run()
    {
        DB::table('banners')->insert([
            [
                'id' => 1,
                'image_path' => 'images/promo banner 1.webp',
                'link' => '',
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'image_path' => 'images/promo banner 2.webp',
                'link' => '/products',
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'image_path' => 'images/promo banner 3.webp',
                'link' => '/products',
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 4,
                'image_path' => 'images/promo banner 4.webp',
                'link' => '/products',
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 6,
                'image_path' => 'images/dTHpWEY2cuffHpEoDUtENSP28T0up12KunZKjBbU.jpg',
                'link' => '/products/21',
                'created_at' => '2025-05-27 04:00:00',
                'updated_at' => '2025-05-27 04:00:00',
            ],
        ]);
    }
}
