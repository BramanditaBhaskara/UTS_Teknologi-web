<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TagihanSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('tagihans')->insert([
            [
                'bulan' => 'Januari 2024',
                'jumlah' => 15000,
                'krama_id' => 1, // Sesuai ID Datakrama 1
                'iuran' => 5000,
                'dedosan' => 5000,
                'peturunan' => 5000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'bulan' => 'Januari 2024',
                'jumlah' => 10000,
                'krama_id' => 2,
                'iuran' => 5000,
                'dedosan' => 5000,
                'peturunan' => 0,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'bulan' => 'Februari 2024',
                'jumlah' => 15000,
                'krama_id' => 1,
                'iuran' => 5000,
                'dedosan' => 5000,
                'peturunan' => 5000,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
