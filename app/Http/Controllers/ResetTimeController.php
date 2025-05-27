<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserMission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\ResetTimes;

class ResetTimeController extends Controller
{
    public function resetMissions()
    {
        $users = UserMission::select('user_id')->distinct()->pluck('user_id');

        $existingMissions = UserMission::whereHas('mission', function ($query) {
            $query->where('type', 'mission');
        })->select('mission_id')->distinct()->get(); 

        foreach ($users as $user) {
            foreach ($existingMissions as $missionRef) {
                UserMission::create([
                    'user_id' => $user, 
                    'mission_id' => $missionRef->mission_id,
                    'progress' => 0,
                    'reward_claimed' => false,
                    'completed_at' => null,
                    'created_at' => Carbon::now(),
                    'type' => 'mission',
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


    public function admin(){
        $resetTimes = ResetTimes::all();

        return Inertia::render('Admin/ResetTimes/Index', ['resetTimes' => $resetTimes]);
    }

    public function create(){
        return Inertia::render('Admin/ResetTimes/Add');
    }

    public function store(Request $request){
        $fields = $request->validate([
            'game_type' => 'required|string',
            'reset_time' => ['required', 'date_format:H:i:s'],
            'isWeekly' => 'required|boolean',
        ]);

        ResetTimes::create([
            'game_type' => $fields['game_type'],
            'reset_time' => $fields['reset_time'],
            'isWeekly' => $fields['isWeekly'],
        ]);

        return redirect('/admin/resettimes')->with('success', 'Reset Time created successfully!');
    }



    public function edit($id){
        $resettimes = ResetTimes::find($id);
        return Inertia::render('Admin/ResetTimes/Edit', ['resettimes' => $resettimes]);
    }

    public function update(ResetTimes $resettimes, Request $request){
        $fields = $request->validate([
            'game_type' => 'required|string',
            'reset_time' => ['required', 'date_format:H:i:s'],
            'isWeekly' => 'required|boolean',
        ]);

        $resettimes->update([
            'game_type' => $fields['game_type'],
            'reset_time' => $fields['reset_time'],
            'isWeekly' => $fields['isWeekly'],
        ]);

        return redirect('/admin/resettimes')->with('success', 'Reset Time updated successfully!');
    }

    public function delete(ResetTimes $resettimes){
        $resettimes->delete();

        return redirect('/admin/resettimes')->with('success', 'Reset Time deleted successfully!');
    }
}
