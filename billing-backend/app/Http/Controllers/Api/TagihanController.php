<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tagihan;
use App\Models\Datakrama;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TagihanController extends Controller
{
    
    public function index()
    {
        return response()->json(Tagihan::with('krama')->get());
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'krama_id' => 'required|exists:datakramas,id', 
        ]);
        $krama = Datakrama::find($request->krama_id);
        $currentMonth = Carbon::now()->format('F Y');
        $tagihanBulanIni = Tagihan::where('krama_id', $krama->id)
                                  ->where('bulan', $currentMonth)
                                  ->exists();

        if ($tagihanBulanIni) {
            return response()->json(['message' => 'Tagihan untuk bulan ' . $currentMonth . ' sudah dibuat.'], 400);
        }
        $iuran = 0;
        $dedosan = 0;
        $peturunan = 0;

        switch ($krama->status) {
            case 'krama desa':
                $iuran = 5000;
                $dedosan = 5000;
                $peturunan = 5000;
                break;
            case 'krama tamu':
                $iuran = 10000;
                $dedosan = 10000;
                $peturunan = 0; 
                break;
            case 'tamu':
                $iuran = 0; 
                $dedosan = 0;
                $peturunan = 0;
                break;
        }

        $totalJumlah = $iuran + $dedosan + $peturunan;
        try {
            DB::beginTransaction();

            $tagihan = Tagihan::create([
                'krama_id' => $krama->id, // Menggunakan ID krama sebagai kunci asing
                'bulan' => $currentMonth,
                'jumlah' => $totalJumlah,
                'iuran' => $iuran,
                'dedosan' => $dedosan,
                'peturunan' => $peturunan,
            ]);

            DB::commit();
            return response()->json($tagihan, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat tagihan.', 'error' => $e->getMessage()], 500);
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