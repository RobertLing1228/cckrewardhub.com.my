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
        Schema::table('mission_completion_logs', function (Blueprint $table) {
            $table->foreign(['user_id'])->references(['userID'])->on('user')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mission_completion_logs', function (Blueprint $table) {
            $table->dropForeign('mission_completion_logs_user_id_foreign');
        });
    }
};
