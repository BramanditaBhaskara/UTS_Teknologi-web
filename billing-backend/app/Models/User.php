<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Tambahkan ini
    ];

    /**
     * Atribut yang disembunyikan dari serialisasi.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atribut yang perlu di-casting.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * 🔹 Cek apakah user adalah admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * 🔹 Cek apakah user adalah superadmin
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === 'superadmin';
    }
}
