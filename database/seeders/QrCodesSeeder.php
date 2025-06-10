<?php

namespace Database\Seeders;
use App\Models\QrCode;
use Illuminate\Database\Seeder;

class QrCodesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        QrCode::insert([
            ['id' => 1, 'product_id' => null, 'qr_value' => 'text_test_1', 'qr_type' => 'text', 'is_active' => 1],
            ['id' => 4, 'product_id' => null, 'qr_value' => 'text_test_2', 'qr_type' => 'text', 'is_active' => 1],
            ['id' => 6, 'product_id' => null, 'qr_value' => 'text_test_3', 'qr_type' => 'text', 'is_active' => 1],
            ['id' => 14, 'product_id' => 20, 'qr_value' => '/products/20', 'qr_type' => 'product', 'is_active' => 1],
        ]);

    }
}
