<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ResetTimes;

class ResetTimeController extends Controller
{
    public function dashboard(){
        $resetTimes = ResetTimes::all()->pluck('reset_time', 'game_type');

        return Inertia::render('Admin/Dashboard', [
            'resetTimes' => $resetTimes
        ]);
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
    
