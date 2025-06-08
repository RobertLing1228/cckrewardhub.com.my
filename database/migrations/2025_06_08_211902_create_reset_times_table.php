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
        Schema::create('reset_times', function (Blueprint $table) {
            $table->integer('id', true);
            $table->enum('game_type', ['mission', 'wheel']);
            $table->time('reset_time');
            $table->boolean('isWeekly');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reset_times');
    }
};
