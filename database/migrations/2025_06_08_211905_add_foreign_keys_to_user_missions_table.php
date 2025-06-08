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
        Schema::table('user_missions', function (Blueprint $table) {
            $table->foreign(['mission_id'], 'user_missions_ibfk_2')->references(['id'])->on('missions')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['user_id'], 'user_missions_userID_foreign')->references(['userID'])->on('user')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_missions', function (Blueprint $table) {
            $table->dropForeign('user_missions_ibfk_2');
            $table->dropForeign('user_missions_userID_foreign');
        });
    }
};
