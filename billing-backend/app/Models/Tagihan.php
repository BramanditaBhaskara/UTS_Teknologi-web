<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tagihan extends Model
{
    use HasFactory;

    protected $fillable = [
        'krama_id', 
        'bulan',        
        'jumlah',       
        'iuran', 
        'dedosan', 
        'peturunan',
    ];

    public function krama()
    {

        return $this->belongsTo(Datakrama::class, 'krama_id');
    }
    public function pembayaran() 
    {
        return $this->hasOne(Pembayaran::class, 'tagihan_id');
    }
}