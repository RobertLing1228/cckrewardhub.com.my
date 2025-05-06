<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ResetTimeController;
use App\Models\ResetTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ResetWheelCommand extends Command
{
    protected $signature = 'reset:wheel';
    protected $description = 'Reset all wheel-type user missions daily';

    public function handle()
{
    \Log::info("⏰ Wheel reset command triggered!");

    $resetTime = ResetTime::where('game_type', 'wheel')->first();

    if (!$resetTime) {
        \Log::warning("⚠ No reset time set for 'wheel'");
        return;
    }

    $now = Carbon::now();
    $resetAt = Carbon::createFromFormat('H:i:s', $resetTime->reset_time);

    \Log::info("🕒 Now: {$now->format('H:i:s')} | Reset At: {$resetAt->format('H:i:s')}");

    if ($now->format('H:i') === $resetAt->format('H:i')) {
        \Log::info("✅ Time matched! Resetting wheel...");
        (new ResetTimeController)->resetWheel();
    } else {
        \Log::info("⏱ Not the scheduled time.");
    }
}

}
