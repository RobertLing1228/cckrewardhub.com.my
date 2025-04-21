<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserMissions;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Missions;

class UserMissionController extends Controller
{
    public function admin(){
        $usermissions = UserMissions::all();
        return Inertia::render('Admin/UserMissions/Index', ['user_missions' => $usermissions]);
    }

    public function create(){    
        $users = User::all();
        $missions = Missions::all();
        return Inertia::render('Admin/UserMissions/Add',['users' => $users, 'missions' => $missions]);
    }

    public function store(Request $request){
        $fields = $request->validate([
            'user_id' => 'required|integer|exists:user,userID',
            'mission_id' => 'required|integer|exists:missions,id',
            'progress' => 'required|integer',
            'reward_claimed' => 'required|boolean',
        ]);

        UserMissions::create([
            'user_id' => $fields['user_id'],
            'mission_id' => $fields['mission_id'],
            'progress' => $fields['progress'],
            'reward_claimed' => $fields['reward_claimed'],
        ]);

        return redirect('/admin/usermissions')->with('success', 'User Mission created successfully!');
    }

    public function edit($id){   
        $usermissions = UserMissions::find($id);
        $users = User::all();
        $missions = Missions::all();
        return Inertia::render('Admin/UserMissions/Edit', ['usermission' => $usermissions, 'users' => $users, 'missions' => $missions]);
    }

    public function update(UserMissions $usermissions, Request $request){
        $fields = $request->validate([
            'user_id' => 'required|integer|exists:user,userID',
            'mission_id' => 'required|integer|exists:missions,id',
            'progress' => 'required|integer',
            'reward_claimed' => 'required|boolean',
        ]);

        $usermissions->update([
            'user_id' => $fields['user_id'],
            'mission_id' => $fields['mission_id'],
            'progress' => $fields['progress'],
            'reward_claimed' => $fields['reward_claimed'],
        ]);

        return redirect('/admin/usermissions')->with('success', 'User Mission updated successfully!');
    }
    
    public function delete(UserMissions $usermissions){
        $usermissions->delete();
        return redirect('/admin/usermissions')->with('success', 'User Mission deleted successfully!');
    }
}
