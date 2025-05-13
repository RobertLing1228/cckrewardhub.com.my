<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\LoginLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogSuccessfulLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event)
{
    if (Auth::guard('web')->check()) {
    // Only log if it's a regular member
    LoginLog::create([
        'user_id' => Auth::id(),
        'logged_in_at' => now(),
    ]);
}
}
}
