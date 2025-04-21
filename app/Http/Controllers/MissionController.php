<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Missions;
use App\Models\ResetTimes;

class MissionController extends Controller
{
    public function admin(){
        $missions = Missions::all();
        $m_resets = ResetTimes::where('game_type', 'mission')->first();

        return Inertia::render('Admin/Missions/Index', ['missions' => $missions, 'm_resets' => $m_resets]);
    }
}
