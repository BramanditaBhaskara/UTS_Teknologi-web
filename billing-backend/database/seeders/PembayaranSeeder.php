<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class PembayaranSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('pembayarans')->insert([
            [
                'nik' => '5101010101',
                'tagihan_id' => 1, // pastikan ID 1 ada di tagihans
                'metode' => 'Cash',
                'keterangan' => 'Lunas',
                'tanggal_bayar' => '2024-01-15',
                'jumlah_bayar' => 15000.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'nik' => '5101010102',
                'tagihan_id' => 2,
                'metode' => 'Transfer',
                'keterangan' => 'Lunas',
                'tanggal_bayar' => '2024-01-20',
                'jumlah_bayar' => 10000.00,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
