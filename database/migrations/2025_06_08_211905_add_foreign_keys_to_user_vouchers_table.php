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
        Schema::table('user_vouchers', function (Blueprint $table) {
            $table->foreign(['userID'], 'user_vouchers_userID_foreign')->references(['userID'])->on('user')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['voucher_ID'])->references(['id'])->on('vouchers')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_vouchers', function (Blueprint $table) {
            $table->dropForeign('user_vouchers_userID_foreign');
            $table->dropForeign('user_vouchers_voucher_id_foreign');
        });
    }
};
