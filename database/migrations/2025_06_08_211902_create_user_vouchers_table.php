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
            $table->bigIncrements('id');
            $table->unsignedBigInteger('userID')->index('user_vouchers_userid_foreign');
            $table->unsignedBigInteger('voucher_ID')->index('user_vouchers_voucher_id_foreign');
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
        Schema::dropIfExists('user_vouchers');
    }
};
