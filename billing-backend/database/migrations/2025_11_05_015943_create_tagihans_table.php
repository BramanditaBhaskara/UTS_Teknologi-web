<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tagihans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('krama_id'); // FK ke datakramas
            $table->string('bulan', 255)->nullable();
            $table->integer('jumlah')->nullable();
            $table->integer('iuran')->nullable();
            $table->integer('dedosan')->nullable();
            $table->integer('peturunan')->nullable();
            $table->timestamps();

            // Foreign key dengan referensi yang benar
            $table->foreign('krama_id')
                  ->references('id')
                  ->on('datakramas')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tagihans');
    }
};
