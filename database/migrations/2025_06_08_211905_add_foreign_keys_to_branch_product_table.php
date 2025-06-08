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
        Schema::table('branch_product', function (Blueprint $table) {
            $table->foreign(['branch_id'], 'fk_branch_product_branch')->references(['id'])->on('branches')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['productID'], 'fk_branch_product_product')->references(['productID'])->on('products')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('branch_product', function (Blueprint $table) {
            $table->dropForeign('fk_branch_product_branch');
            $table->dropForeign('fk_branch_product_product');
        });
    }
};
