<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\Tagihan;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PembayaranController extends Controller
{
   
    public function store(Request $request)
    {
        
        $request->validate([

            'tagihan_id' => 'required|exists:tagihans,id', 
            'jumlah_bayar' => 'required|numeric|min:0',
            'metode' => 'nullable|string|max:50',
            'keterangan' => 'nullable|string|max:50',
            'nik' => 'required|string|exists:datakramas,nik', 
        ]);

        $tagihan = Tagihan::find($request->tagihan_id);
        
        if (!$tagihan) {
             return response()->json(['message' => 'Tagihan tidak ditemukan.'], 404);
        }

        if ($tagihan->pembayaran()->exists()) {
             return response()->json(['message' => 'Tagihan ini sudah lunas atau sudah memiliki pembayaran.'], 400);
        }
    
        if ($request->jumlah_bayar < $tagihan->jumlah) {
             return response()->json([
                 'message' => 'Jumlah pembayaran kurang.', 
                 'tagihan_total' => $tagihan->jumlah, 
                 'dibayar' => $request->jumlah_bayar
             ], 400);
        }

        try {
            DB::beginTransaction();

            $pembayaran = Pembayaran::create([
                'tagihan_id' => $request->tagihan_id,
                'nik' => $request->nik,
                'jumlah_bayar' => $request->jumlah_bayar, // Nama kolom yang benar
                'metode' => $request->metode ?? 'Tunai',
                'keterangan' => $request->keterangan ?? 'Lunas', // Default keterangan
                'tanggal_bayar' => Carbon::now()->toDateString(), // Menggunakan tanggal hari ini
            ]);

            DB::commit();
            return response()->json($pembayaran, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menyimpan pembayaran.', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {

        return response()->json(Pembayaran::with('tagihan.krama')->get());
    }

    public function verifikasi($id)
    {
        $pembayaran = Pembayaran::find($id);

        if (!$pembayaran) {
            return response()->json(['message' => 'Data pembayaran tidak ditemukan'], 404);
        }

        // Misalnya logika verifikasi adalah mengubah status dari 'pending' ke 'selesai'
        $pembayaran->keterangan = 'selesai';
        $pembayaran->save();

        return response()->json([
            'message' => 'Pembayaran berhasil diverifikasi ✅',
            'data' => $pembayaran
        ], 200);
    }

}