<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserMission;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ResetTimeController extends Controller
{
    public function resetMissions()
    {
        $users = UserMission::select('user_id')->distinct()->pluck('user_id');

        $existingMissions = UserMission::select('mission_id')->distinct()->get(); 

        foreach ($users as $user) {
            foreach ($existingMissions as $missionRef) {
                UserMission::create([
                    'user_id' => $user, 
                    'mission_id' => $missionRef->mission_id,
                    'progress' => 0,
                    'reward_claimed' => false,
                    'completed_at' => null,
                    'created_at' => Carbon::now(),
                    'type' => $missionRef->mission_id == 3 ? 'wheel' : 'mission',
                ]);
            }
        }        

        return response()->json(['message' => 'New mission records created for all users.']);
    }

    public function resetWheel()
    {
        $users = UserMission::select('user_id')->distinct()->pluck('user_id');
        
        $wheelMissions = UserMission::whereHas('mission', function ($query) {
            $query->where('type', 'wheel');
        })->select('mission_id')->distinct()->get();

        foreach ($users as $user) {
            foreach ($wheelMissions as $missionRef) {
                UserMission::create([
                    'user_id' => $user,
                    'mission_id' => $missionRef->mission_id,
                    'progress' => 0,
                    'reward_claimed' => false,
                    'completed_at' => null,
                    'created_at' => Carbon::now(),
                    'type' => 'wheel'
                ]);
            }
        }

        return response()->json(['message' => 'New wheel mission records created for all users.']);
    }
}
