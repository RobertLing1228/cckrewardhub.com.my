<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\UserMission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        if (!$userId) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $missions = Mission::all();
        $userMissions = UserMission::where('user_id', $userId)->get()->keyBy('mission_id');

        $missions = $missions->map(function ($mission) use ($userMissions) {
            $userMission = $userMissions->get($mission->id);
            return [
                'id' => $mission->id,
                'mission_name' => $mission->mission_name,
                'mission_description' => $mission->mission_description,
                'mission_goal' => $mission->mission_goal,
                'progress' => $userMission ? $userMission->progress : 0,
                'reward_claimed' => $userMission ? $userMission->reward_claimed : 0,
            ];
        });

        return response()->json($missions);
    }

    public function getProgress($missionId)
    {
        $userId = auth()->id();
        if (!$userId) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $userMission = UserMission::where('user_id', $userId)
            ->where('mission_id', $missionId)
            ->first();

        if (!$userMission) {
            return response()->json(['progress' => 0]);
        }

        return response()->json(['progress' => $userMission->progress]);
    }

    public function updateProgress(Request $request, $missionId)
{
    $userId = auth()->id();
    if (!$userId) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    $request->validate([
        'progress' => 'required|integer|min:0',
    ]);

    $progress = $request->input('progress', 0);

    $userMission = UserMission::firstOrCreate(
        [
            'user_id' => $userId,
            'mission_id' => $missionId,
        ],
        [
            'created_at' => now(),
        ]
    );

    $userMission->progress = $progress;

    $mission = Mission::find($missionId);
    if ($mission && $progress >= $mission->mission_goal && !$userMission->completed_at) {
        $userMission->completed_at = now();
    }

    $userMission->save();

    return response()->json(['message' => 'Progress updated']);
}

}
