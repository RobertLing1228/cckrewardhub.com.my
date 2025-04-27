<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMission;
use App\Models\Mission;
use Illuminate\Support\Facades\Auth;

class UserMissionController extends Controller
{
    protected $resetTimeController;
    public function __construct(ResetTimeController $resetTimeController)
    {
        // Inject ResetTimeController into the UserMissionController
        $this->resetTimeController = $resetTimeController;
    }

    public function start()
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Call resetProgress for both 'Mission' and 'Wheel' before fetching missions
        $this->resetTimeController->resetProgress('Mission');
        $this->resetTimeController->resetProgress('Wheel');

        // Initialize user missions if they don't already exist
        if (!UserMission::where('user_id', $userId)->exists()) {
            $missions = Mission::all();
            foreach ($missions as $mission) {
                UserMission::create([
                    'user_id' => $userId,
                    'mission_id' => $mission->id,
                    'progress' => 0,
                    'reward_claimed' => false,
                    'created_at' => now(),
                    'completed_at' => null,
                ]);
            }
        }

        return response()->json(['message' => 'User missions initialized']);
    }

    public function claim()
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        UserMission::where('user_id', $userId)
            ->update(['reward_claimed' => 1]);

        return response()->json(['message' => 'Reward claimed successfully']);
    }
}
