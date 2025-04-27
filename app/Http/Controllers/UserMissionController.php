<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMission;
use App\Models\Mission;
use App\Model\User;
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
                    'is_completed' => false,
                    'reward_claimed' => false,
                ]);
            }
        }

        return response()->json(['message' => 'User missions initialized']);
    }

    // [GET] /missions/{id}/progress
    public function show($id)
    {
        $userMission = UserMission::where('user_id', Auth::id())
            ->where('mission_id', $id)
            ->first();

        if (!$userMission) {
            return response()->json(['progress' => 0]); // Return 0 if not found
        }

        return response()->json([
            'progress' => $userMission->progress,
            'is_completed' => $userMission->is_completed,
        ]);
    }

    // [POST] /missions/{id}/progress
    public function update(Request $request, $id)
    {
        $userMission = UserMission::firstOrCreate(
            ['user_id' => Auth::id(), 'mission_id' => $id],
            ['progress' => 0, 'is_completed' => false, 'reward_claimed' => false]
        );

        $userMission->progress = $request->input('progress', $userMission->progress);
        $userMission->save();

        return response()->json(['message' => 'Progress updated', 'progress' => $userMission->progress]);
    }

    // [POST] /missions/{id}/complete
    public function complete($id)
    {
        $userMission = UserMission::where('user_id', Auth::id())
            ->where('mission_id', $id)
            ->first();

        if (!$userMission) {
            return response()->json(['error' => 'Mission not found.'], 404);
        }

        $userMission->is_completed = true;
        $userMission->save();

        return response()->json(['message' => 'Mission marked as completed']);


    }
}
