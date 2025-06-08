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
        Schema::create('claim', function (Blueprint $table) {
            $table->integer('claimID', true);
            $table->integer('voucherID')->nullable();
            $table->string('memberID', 32);
            $table->enum('gameType', ['Mission', 'Wheel']);
            $table->date('claim_date')->comment('claiming date resets after midnight');
            $table->enum('status', ['pending', 'successful', 'failed']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claim');
    }
};
