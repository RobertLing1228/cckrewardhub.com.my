<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\UserMission;
use App\Models\MissionCompletionLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MissionController extends Controller
{
    public function admin(){
        $missions = Mission::all();


        return Inertia::render('Admin/Missions/Index', ['missions' => $missions]);
    }

    public function create(){
        return Inertia::render('Admin/Missions/Add');
    }

    public function store(Request $request){
        $fields = $request->validate([
            'mission_name' => 'required|string|max:255',
            'mission_description' => 'required|string',
            'mission_goal' => 'required|integer',
        ]);

        Mission::create([
            'mission_name' => $fields['mission_name'],
            'mission_description' => $fields['mission_description'],
            'mission_goal' => $fields['mission_goal'],
        ]);

        return redirect('/admin/missions')->with('success', 'Mission created successfully!');
    }

    public function edit(Mission $mission){
        return Inertia::render('Admin/Missions/Edit', ['mission' => $mission]);
    }

    public function update(Request $request, Mission $mission){
        $fields = $request->validate([
            'mission_name' => 'required|string|max:255',
            'mission_description' => 'required|string',
            'mission_goal' => 'required|integer',
        ]);

        $mission->update([
            'mission_name' => $fields['mission_name'],
            'mission_description' => $fields['mission_description'],
            'mission_goal' => $fields['mission_goal'],
        ]);

        return redirect('/admin/missions')->with('success', 'Mission updated successfully!');
    }

    public function delete(Mission $mission){
        $mission->delete();
        return redirect('/admin/missions')->with('success', 'Mission deleted successfully!');
    }

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
                'mission_image' => $mission->mission_image,
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

        $userMission = UserMission::where('user_id', $userId)
        ->where('mission_id', $missionId)
        ->orderByDesc('created_at')
        ->first();


        if (!$userMission) {
            return response()->json(['error' => 'Mission not found for user'], 404);
        }

        $userMission->progress = $progress;

        $mission = Mission::find($missionId);
        if ($mission && $progress >= $mission->mission_goal && !$userMission->completed_at) {
            $userMission->completed_at = now();
        }

        $userMission->save();

        $this->checkAndLogMissionCompletion($userId);

        return response()->json(['message' => 'Progress updated']);
    }

    private function checkAndLogMissionCompletion($userId)
    {

        $latestCreatedAt = UserMission::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->value('created_at'); // gets the most recent timestamp

        if (!$latestCreatedAt) {
            return; // no missions
        }

        // Get the 3 missions created at that exact timestamp
        $latestMissions = UserMission::where('user_id', $userId)
            ->where('created_at', $latestCreatedAt)
            ->get();

        // If less than 3, skip
        if ($latestMissions->count() < 3) {
            return;
        }

        // Check if all three are completed (progress >= mission_goal or completed_at is not null)
        $allCompleted = $latestMissions->every(function ($mission) {
            return $mission->completed_at !== null;
        });

        if ($allCompleted) {
            // Avoid duplicate logging (if already logged)
            $alreadyLogged = MissionCompletionLog::where('user_id', $userId)
                ->whereDate('date_completed', today())
                ->exists();

            if (!$alreadyLogged) {
                MissionCompletionLog::create([
                    'user_id' => $userId,
                    'date_completed' => now(),
                ]);
            }
        }
    }

}
