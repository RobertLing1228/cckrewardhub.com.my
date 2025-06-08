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
        Schema::create('wheel_rewards', function (Blueprint $table) {
            $table->integer('id', true);
            $table->enum('reward_type', ['voucher', 'loss']);
            $table->decimal('voucher_value', 10)->nullable()->comment('2.00, 3.00, 5.00, or NULL');
            $table->float('probability')->nullable()->comment('Should total 1.0 across all entries');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wheel_rewards');
    }
};
