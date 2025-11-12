<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Buat akun admin
        User::factory()->create([
            'name' => 'Admin Billing',
            'email' => 'admin@billing.com',
        ]);

        // Jalankan semua seeder sesuai urutan dependensi
        $this->call([
            DatakramaSeeder::class,   // buat data krama dulu
            TagihanSeeder::class,     // baru tagihan
            PembayaranSeeder::class,  // terakhir pembayaran
        ]);
    }
}
