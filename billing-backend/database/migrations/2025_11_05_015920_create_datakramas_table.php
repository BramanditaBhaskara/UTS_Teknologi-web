<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('datakramas', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 255)->unique();
            $table->string('name', 255);
            $table->enum('gender', ['L', 'P']);
            $table->enum('status', ['krama desa', 'krama tamu', 'tamu']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('datakramas');
    }
};
