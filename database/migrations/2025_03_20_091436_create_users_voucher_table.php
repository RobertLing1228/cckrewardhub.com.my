<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_vouchers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('userID')->on('user')->onDelete('cascade');
            $table->foreignId('voucher_ID')->constrained('vouchers')->onDelete('cascade');
            $table->enum('status', ['claimed', 'used'])->default('claimed');
            $table->timestamp('claimed_at')->useCurrent();
            $table->timestamp('used_at')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_voucher');
    }
};
