<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ResetTimes;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(){
        $resetTimes = ResetTimes::all()->pluck('reset_time', 'game_type');

        return Inertia::render('Admin/Dashboard', [
            'resetTimes' => $resetTimes
        ]);
    }
}
