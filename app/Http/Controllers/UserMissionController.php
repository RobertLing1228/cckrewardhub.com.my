<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMission;
use App\Models\Mission;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserMissionController extends Controller
{
    public function admin(){
        $usermissions = UserMission::all();
        return Inertia::render('Admin/UserMissions/Index', ['user_missions' => $usermissions]);
    }

    public function create(){    
        $users = User::all();
        $missions = Mission::all();
        return Inertia::render('Admin/UserMissions/Add',['users' => $users, 'missions' => $missions]);
    }

    public function store(Request $request){
        $fields = $request->validate([
            'user_id' => 'required|integer|exists:user,userID',
            'mission_id' => 'required|integer|exists:missions,id',
            'progress' => 'required|integer',
            'reward_claimed' => 'required|boolean',
        ]);

        UserMission::create([
            'user_id' => $fields['user_id'],
            'mission_id' => $fields['mission_id'],
            'progress' => $fields['progress'],
            'reward_claimed' => $fields['reward_claimed'],
        ]);

        return redirect('/admin/usermissions')->with('success', 'User Mission created successfully!');
    }

    // [POST] /user-missions/start
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
        return redirect()->back()->with(['error' => 'User not authenticated'], 401);
    }

    $latestCreatedAt = UserMission::where('user_id', $userId)
        ->orderByDesc('created_at')
        ->limit(1)
        ->value('created_at');

    if (!$latestCreatedAt) {
        return redirect()->back()->with(['error' => 'No missions found for user'], 404);
    }

    $latestMissions = UserMission::where('user_id', $userId)
        ->where('created_at', $latestCreatedAt)
        ->whereNotNull('completed_at')
        ->where('reward_claimed', 0)
        ->get();

    if ($latestMissions->isEmpty()) {
        return redirect()->back()->with(['error' => 'No completed unclaimed missions found in latest batch'], 404);
    }

    foreach ($latestMissions as $mission) {
        $mission->update(['reward_claimed' => 1]);
    }

    return redirect()->back()->with(['message' => 'Rewards claimed for latest completed missions']);
}

    public function history()
    {
        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login');
        }

        $missions = UserMission::with('mission') // Eager load mission details
            ->where('user_id', $userId)
            ->get();

        return Inertia::render('MissionHistory', [
            'history' => $missions
        ]);
    }


    
}
