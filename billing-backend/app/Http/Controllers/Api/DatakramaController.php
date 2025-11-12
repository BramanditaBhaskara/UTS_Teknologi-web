<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Datakrama;
use Illuminate\Http\Request;

class DatakramaController extends Controller
{
    /** 🔹 Ambil semua data krama */
    public function index()
    {
        return response()->json(Datakrama::all());
    }

    /** 🔹 Ambil data krama berdasarkan NIK (untuk React / form pencarian) */
    public function findByNik($nik)
{
    try {
        $krama = Datakrama::where('nik', $nik)->firstOrFail();
        return response()->json($krama);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['message' => 'NIK tidak ditemukan.'], 404);
    }
}


    /** 🔹 (Opsional) Ambil data krama berdasarkan ID */
    public function show($id)
    {
        $krama = Datakrama::find($id);

        if (!$krama) {
            return response()->json(['message' => 'Krama tidak ditemukan.'], 404);
        }

        return response()->json($krama);
    }
}
