<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Datakrama;
use Illuminate\Http\Request;

class DatakramaController extends Controller
{
    public function index()
    {
        // Mengambil semua data krama
        return response()->json(Datakrama::all());
    }

    public function show($nik)
    {
        // Mencari Datakrama berdasarkan NIK (menggunakan firstOrFail untuk 404 yang rapi)
        try {
            $krama = Datakrama::where('nik', $nik)->firstOrFail();
            return response()->json($krama);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Respons JSON 404 jika NIK tidak ditemukan
            return response()->json(['message' => 'NIK tidak ditemukan.'], 404);
        }
    }
}