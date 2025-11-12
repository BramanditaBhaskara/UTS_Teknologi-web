<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tagihan_id'); // FK ke tagihans
            $table->string('nik', 255)->nullable();
            $table->string('metode', 50)->nullable();
            $table->string('keterangan', 100)->nullable();
            $table->date('tanggal_bayar')->nullable();
            $table->decimal('jumlah_bayar', 10, 2)->nullable();
            $table->timestamps();

            // Foreign key dengan referensi yang benar
            $table->foreign('tagihan_id')
                  ->references('id')
                  ->on('tagihans')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
