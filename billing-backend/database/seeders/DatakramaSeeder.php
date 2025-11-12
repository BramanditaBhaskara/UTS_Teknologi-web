<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DatakramaSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('datakramas')->insert([
            [
                'nik' => '5101010101',
                'name' => 'I Made Suartana',
                'gender' => 'L',
                'status' => 'krama desa',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nik' => '5101010102',
                'name' => 'Ni Luh Sulastri',
                'gender' => 'P',
                'status' => 'krama tamu',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nik' => '5101010103',
                'name' => 'I Ketut Sutama',
                'gender' => 'L',
                'status' => 'tamu',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
