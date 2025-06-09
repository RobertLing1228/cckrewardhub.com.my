<?php

namespace Database\Seeders;
use App\Models\Vouchers;
use Illuminate\Database\Seeder;
class VouchersSeeder extends Seeder
{
    /**
     * Seed the application's database with QR codes.
     */
    public function run(): void
    {
        Vouchers::insert([
            ['id' => 1, 'code' => 'exampleCode', 'name' => 'RM2 Cash Voucher', 'date_issued' => '2025-03-20', 'end_date' => '2025-07-30', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 2.00, 'created_at' => '2025-03-20 10:57:13', 'updated_at' => '2025-04-28 04:12:51'],
            ['id' => 2, 'code' => 'exampleCode2', 'name' => 'RM3 Cash Voucher', 'date_issued' => '2025-03-23', 'end_date' => '2025-07-30', 'status' => 'claimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-03-23 07:38:39', 'updated_at' => '2025-04-28 04:12:51'],
            ['id' => 3, 'code' => 'abc', 'name' => 'RM5 Cash Voucher', 'date_issued' => '2025-03-23', 'end_date' => '2025-04-01', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 5.00, 'created_at' => '2025-03-23 07:40:56', 'updated_at' => '2025-04-28 06:56:22'],
            ['id' => 7, 'code' => 'RM3TESTY', 'name' => 'RM3 Test', 'date_issued' => '2025-04-04', 'end_date' => '2025-11-04', 'status' => 'claimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-04-03 20:45:13', 'updated_at' => '2025-04-28 06:57:20'],
            ['id' => 8, 'code' => 'TSTCODE2', 'name' => 'RM3 Voucher Test 2', 'date_issued' => '2025-04-08', 'end_date' => '2025-08-31', 'status' => 'claimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-04-08 00:17:37', 'updated_at' => '2025-04-07 17:59:17'],
            ['id' => 9, 'code' => 'TSTCODE3', 'name' => 'RM3 Voucher Test 3', 'date_issued' => '2025-04-08', 'end_date' => '2025-12-31', 'status' => 'claimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-04-08 00:17:37', 'updated_at' => '2025-05-15 03:20:54'],
            ['id' => 15, 'code' => 'RM3VOUCH', 'name' => 'RM3 Voucher Test4', 'date_issued' => '2025-04-21', 'end_date' => '2025-06-21', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-04-20 20:51:05', 'updated_at' => '2025-05-15 03:29:30'],
            ['id' => 16, 'code' => 'RM3VOUCH23', 'name' => 'RM3 Voucher Test 5', 'date_issued' => '2025-04-21', 'end_date' => '2026-06-01', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-04-20 20:51:05', 'updated_at' => '2025-05-15 03:36:04'],
            ['id' => 17, 'code' => 'SEMLEO12', 'name' => 'RM2 Cash Voucher', 'date_issued' => '2025-04-28', 'end_date' => '2025-07-20', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 2.00, 'created_at' => '2025-04-28 02:21:46', 'updated_at' => '2025-04-28 02:21:46'],
            ['id' => 20, 'code' => 'AISKREAM', 'name' => 'RM3 Test Voucher Data', 'date_issued' => '2025-05-19', 'end_date' => '2025-07-31', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-05-19 06:14:08', 'updated_at' => '2025-05-19 06:14:08'],
            ['id' => 21, 'code' => 'ICECREAM', 'name' => 'RM3 Test Voucher Data 2', 'date_issued' => '2025-05-19', 'end_date' => '2025-07-31', 'status' => 'unclaimed', 'discount_type' => 'fixed', 'discount_value' => 3.00, 'created_at' => '2025-05-19 06:14:08', 'updated_at' => '2025-05-19 06:14:08'],
        ]);
    }
}
