<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tagihan;
use App\Models\Datakrama;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagihanController extends Controller
{
    
    public function index()
    {
        return response()->json(Tagihan::with('krama')->get());
    }
    
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'krama_id' => 'required|exists:datakramas,id', 
            'bulan' => 'required|string', 
            // Validasi: Pastikan input biaya ada dan berupa integer
            'iuran' => 'required|integer', 
            'dedosan' => 'required|integer',
            'peturunan' => 'required|integer',
        ]);
        
        $krama = Datakrama::find($request->krama_id);
        $tagihanMonth = $request->bulan;
        
        // 2. Cek Duplikasi Tagihan
        // Cek duplikasi berdasarkan krama_id DAN bulan dari request
        $tagihanSudahAda = Tagihan::where('krama_id', $krama->id)
                                 ->where('bulan', $tagihanMonth)
                                 ->exists();

        if ($tagihanSudahAda) {
            // Mengembalikan error 400 dengan pesan yang jelas
            return response()->json(['message' => 'Tagihan untuk bulan ' . $tagihanMonth . ' sudah dibuat.'], 400);
        }
        
        // 3. Ambil nilai biaya dari Request (Sesuai input Admin di Frontend)
        $iuran = $request->iuran;
        $dedosan = $request->dedosan;
        $peturunan = $request->peturunan;

        $totalJumlah = $iuran + $dedosan + $peturunan; // Hitung total
        
        // 4. Simpan Tagihan ke Database
        try {
            DB::beginTransaction();

            $tagihan = Tagihan::create([
                'krama_id' => $krama->id,
                'bulan' => $tagihanMonth,
                'jumlah' => $totalJumlah, // Menggunakan total dari input Admin
                'iuran' => $iuran,       // Menggunakan input Admin
                'dedosan' => $dedosan,   // Menggunakan input Admin
                'peturunan' => $peturunan, // Menggunakan input Admin
            ]);

            DB::commit();
            return response()->json($tagihan, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat tagihan. Terjadi kesalahan server.', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function destroy($id)
    {
        $tagihan = Tagihan::find($id);

        if (!$tagihan) {
            return response()->json(['message' => 'Tagihan tidak ditemukan'], 404);
        }

        $tagihan->delete();

        return response()->json(['message' => 'Tagihan berhasil dihapus'], 200);
    }
}