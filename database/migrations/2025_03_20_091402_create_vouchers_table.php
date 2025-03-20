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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->date('date_issued');
            $table->date('end_date');
            $table->enum('status', ['active', 'expired'])->default('active');
            $table->enum('discount_type', ['percentage', 'fixed']);
            $table->decimal('discount_value', 10, 2);
            $table->integer('usage_limit')->default(1);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
