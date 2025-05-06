<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ResetTimeController;
use App\Models\ResetTime;
use Carbon\Carbon;

class ResetMissionsCommand extends Command
{
    protected $signature = 'reset:missions';
    protected $description = 'Check time and reset all mission-type user missions if due';

    public function handle()
    {
        // Get the scheduled reset time for "mission"
        $resetTime = ResetTime::where('game_type', 'mission')->first();

        if (!$resetTime) {
            $this->error('No reset time configured for missions.');
            return;
        }

        // Check if current time matches reset time
        $now = Carbon::now();
        $resetHour = Carbon::createFromFormat('H:i:s', $resetTime->reset_time);

        if ($now->dayOfWeek === Carbon::MONDAY && $now->format('H:i') === $resetHour->format('H:i')) {
            (new ResetTimeController)->resetMissions();
            $this->info('Missions reset successfully at scheduled time.');
        } else {
            $this->info('Not the scheduled mission reset time.');
        }
    }
}
