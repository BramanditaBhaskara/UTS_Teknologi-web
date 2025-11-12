<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DatakramaController;
use App\Http\Controllers\Api\TagihanController;
use App\Http\Controllers\Api\PembayaranController;

/*
|--------------------------------------------------------------------------
| AUTHENTICATION ROUTES
|--------------------------------------------------------------------------
| Untuk registrasi, login, dan logout user/admin/superadmin
*/
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (auth wajib)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | GENERAL ACCESS (user, admin, superadmin)
    |--------------------------------------------------------------------------
    | Semua role bisa mengakses data dasar & melakukan pembayaran
    */
    Route::middleware('role:user,admin,superadmin')->group(function () {

        // 🧍 Data Krama
        Route::get('/kramas', [DatakramaController::class, 'index']);   // daftar semua krama
        Route::get('/krama/{id}', [DatakramaController::class, 'show']); // detail krama
        Route::get('/kramas/nik/{nik}', [DatakramaController::class, 'findByNik']);

        // 💰 Tagihan
        Route::get('/tagihan', [TagihanController::class, 'index']);     // daftar tagihan
        Route::get('/tagihan/{id}', [TagihanController::class, 'show']); // detail tagihan

        // 💵 Pembayaran
        Route::get('/pembayaran', [PembayaranController::class, 'index']);   // daftar pembayaran
        Route::get('/pembayaran/{id}', [PembayaranController::class, 'show']); // detail pembayaran
        Route::post('/pembayaran', [PembayaranController::class, 'store']);  // user bisa bayar tagihan manapun
    });

    /*
    |--------------------------------------------------------------------------
    | ADMIN & SUPERADMIN ACCESS
    |--------------------------------------------------------------------------
    | Dapat membuat, memperbarui, dan menghapus tagihan
    | serta memverifikasi pembayaran
    */
    Route::middleware('role:admin,superadmin')->group(function () {

        // CRUD Tagihan
        Route::post('/tagihan', [TagihanController::class, 'store']);      // tambah tagihan
        Route::put('/tagihan/{id}', [TagihanController::class, 'update']); // update tagihan
        Route::delete('/tagihan/{id}', [TagihanController::class, 'destroy']); // hapus tagihan

        // Verifikasi Pembayaran
        Route::patch('/pembayaran/{id}/verifikasi', [PembayaranController::class, 'verifikasi']); // ubah status verifikasi
    });

    /*
    |--------------------------------------------------------------------------
    | SUPERADMIN ACCESS ONLY
    |--------------------------------------------------------------------------
    | Superadmin mengelola data pengguna
    */
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/admin/list', [AuthController::class, 'listUsers']);     // lihat semua user
        Route::delete('/admin/delete/{id}', [AuthController::class, 'deleteUser']); // hapus user

        // 🔹 Tambahan: Export data (opsional)
        Route::get('/export/users', [AuthController::class, 'exportUsers']);
        Route::get('/export/tagihan', [TagihanController::class, 'export']);
        Route::get('/export/pembayaran', [PembayaranController::class, 'export']);
    });
});

/*
|--------------------------------------------------------------------------
| DEBUG ROUTE
|--------------------------------------------------------------------------
| Untuk memastikan API aktif
*/
Route::get('/debug', fn() => response()->json(['status' => '✅ API aktif dan berjalan']));
