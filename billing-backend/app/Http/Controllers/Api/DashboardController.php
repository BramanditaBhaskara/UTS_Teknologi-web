<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Datakrama;
use App\Models\Pembayaran;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Hitung total krama
        $totalKrama = Datakrama::count();

        // Hitung jumlah sudah & belum bayar (pastikan tabel 'pembayarans' ada kolom 'status_pembayaran')
        $sudahBayar = Pembayaran::where('status_pembayaran', 'Sudah Bayar')->count();
        $belumBayar = Pembayaran::where('status_pembayaran', 'Belum Bayar')->count();

        // Ambil data krama
        $dataKrama = Datakrama::select('id', 'nik', 'name', 'status')->get();

        return response()->json([
            'totalKrama' => $totalKrama,
            'sudahBayar' => $sudahBayar,
            'belumBayar' => $belumBayar,
            'dataKrama' => $dataKrama
        ]);
    }
}
