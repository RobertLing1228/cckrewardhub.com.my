<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BranchesSeeder extends Seeder
{
    public function run()
    {
        DB::table('branches')->insert([
            [
                'id' => 1,
                'name' => 'Market Street Branch',
                'created_at' => '2025-04-02 18:10:47',
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'name' => 'Gambier branch',
                'created_at' => '2025-04-02 18:10:47',
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'name' => 'Satok Branch',
                'created_at' => '2025-04-02 18:11:46',
                'updated_at' => null,
            ],
            [
                'id' => 4,
                'name' => '3rd mile Branch',
                'created_at' => '2025-04-02 18:12:39',
                'updated_at' => null,
            ],
            [
                'id' => 5,
                'name' => 'Kubah Ria Branch',
                'created_at' => '2025-04-02 18:12:58',
                'updated_at' => null,
            ],
            [
                'id' => 6,
                'name' => 'Kuching City Mall Branch',
                'created_at' => '2025-04-02 18:13:15',
                'updated_at' => null,
            ],
            [
                'id' => 7,
                'name' => 'Petanak Branch',
                'created_at' => '2025-04-02 18:13:32',
                'updated_at' => null,
            ],
            [
                'id' => 8,
                'name' => 'Jln Datuk Ajibah Abol Branch',
                'created_at' => '2025-04-02 18:13:50',
                'updated_at' => null,
            ],
            [
                'id' => 9,
                'name' => 'BDC Branch',
                'created_at' => '2025-04-02 18:14:16',
                'updated_at' => null,
            ],
            [
                'id' => 10,
                'name' => 'Semariang Branch',
                'created_at' => '2025-04-02 18:14:57',
                'updated_at' => null,
            ],
            [
                'id' => 11,
                'name' => 'Matang Branch',
                'created_at' => '2025-04-02 18:15:20',
                'updated_at' => null,
            ],
            [
                'id' => 12,
                'name' => 'Kota Padawan Branch',
                'created_at' => '2025-04-02 18:15:32',
                'updated_at' => null,
            ],
            [
                'id' => 13,
                'name' => 'Stutong Branch',
                'created_at' => '2025-04-02 18:15:53',
                'updated_at' => null,
            ],
            [
                'id' => 14,
                'name' => 'Demak Laut Branch',
                'created_at' => '2025-04-02 18:16:09',
                'updated_at' => null,
            ],
            [
                'id' => 15,
                'name' => 'Malihah Branch',
                'created_at' => '2025-04-02 18:17:04',
                'updated_at' => null,
            ],
            [
                'id' => 26,
                'name' => 'Miri Branch',
                'created_at' => '2025-05-18 05:12:04',
                'updated_at' => '2025-05-18 05:12:04',
            ],
            [
                'id' => 27,
                'name' => 'Kuching Branch',
                'created_at' => '2025-05-18 05:12:04',
                'updated_at' => '2025-05-18 05:12:04',
            ],
        ]);
    }
}
