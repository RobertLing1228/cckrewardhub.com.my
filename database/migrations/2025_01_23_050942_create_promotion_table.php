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
        Schema::create('promotion', function (Blueprint $table) {
            $table->integer('promotionID', true);
            $table->integer('productID');
            $table->string('title');
            $table->text('description');
            $table->date('start_date')->comment('cannot be after end date');
            $table->date('end_date')->comment('cannot be before start date');
            $table->string('code', 32);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotion');
    }
};
