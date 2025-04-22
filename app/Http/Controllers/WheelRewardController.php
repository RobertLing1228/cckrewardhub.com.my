<?php

namespace App\Http\Controllers;

use App\Models\WheelReward;
use Illuminate\Http\Request;

class WheelRewardController extends Controller
{
    // Fetch all wheel rewards
    public function index()
    {
        $rewards = WheelReward::all();

        return response()->json($rewards);
    }
}
