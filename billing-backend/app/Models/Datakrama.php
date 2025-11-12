<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Datakrama extends Model
{
    use HasFactory;

    protected $fillable = ['nik', 'name', 'gender', 'status'];
    
    public function tagihans() 
    {
        return $this->hasMany(Tagihan::class, 'krama_id');
    }
}