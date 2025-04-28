<?php

namespace App\Http\Controllers;

use App\Models\ResetTime;
use App\Models\UserMission;
use App\Models\WheelSpin;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResetTimeController extends Controller
{

    public function admin(){
        $resetTimes = ResetTime::all();

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

        ResetTime::create([
            'game_type' => $fields['game_type'],
            'reset_time' => $fields['reset_time'],
            'isWeekly' => $fields['isWeekly'],
        ]);

        return redirect('/admin/resettimes')->with('success', 'Reset Time created successfully!');
    }



    public function edit($id){
        $resettimes = ResetTime::find($id);
        return Inertia::render('Admin/ResetTimes/Edit', ['resettimes' => $resettimes]);
    }

    public function update(ResetTime $resettimes, Request $request){
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

    public function delete(ResetTime $resettimes){
        $resettimes->delete();

        return redirect('/admin/resettimes')->with('success', 'Reset Time deleted successfully!');
    }

    public function index()
{
    try {
        $resetTimes = ResetTime::all();
        
        // Add time_left to each reset time
        $resetTimes = $resetTimes->map(function($resetTime) {
            $now = Carbon::now();
            $endDate = Carbon::parse($resetTime->end_date);
            $diff = $now->diff($endDate);
            
            // Format the difference into a human-readable format
            $timeLeft = "{$diff->d} days {$diff->h} hours {$diff->i} minutes";
            $resetTime->time_left = $timeLeft;
            
            return $resetTime;
        });

        return response()->json($resetTimes);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Unable to fetch reset times'], 500);
    }
}

    /**
     * Reset start_date and end_date for mission and wheel resets.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function resetDate(Request $request)
    {
        // Validate input
        $request->validate([
            'game_type' => 'required|in:Mission,Wheel',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'reset_day' => 'required|integer|min:1', // Reset frequency, like 1 for daily, 7 for weekly
        ]);

        // Find the reset time by game type
        $resetTime = ResetTime::where('game_type', $request->game_type)->first();

        if ($resetTime) {
            // Update the start_date and end_date for the reset
            $resetTime->update([
                'start_date' => Carbon::parse($request->start_date),
                'end_date' => Carbon::parse($request->end_date),
                'reset_day' => $request->reset_day,
            ]);
        } else {
            // If no record found, create a new one
            ResetTime::create([
                'game_type' => $request->game_type,
                'start_date' => Carbon::parse($request->start_date),
                'end_date' => Carbon::parse($request->end_date),
                'reset_day' => $request->reset_day,
            ]);
        }

        return response()->json(['message' => 'Reset time updated successfully.']);
    }

    /**
     * Reset progress for Mission or WheelSpin if the end_date has passed.
     *
     * @param string $gameType
     * @return \Illuminate\Http\Response
     */
    public function resetProgress($gameType)
    {
        // Get the current reset time record for the game type (Mission or WheelSpin)
        $reset = ResetTime::where('game_type', $gameType)->first();

        if (!$reset) {
            return response()->json(['message' => 'Reset time not found for ' . $gameType], 404);
        }

        // Get current time
        $now = Carbon::now();

        // Check if current time is past the end_date
        if ($now->greaterThan($reset->end_date)) {
            // Perform the reset operation for the specified game type
            if ($gameType === 'Mission') {
                $this->resetMissionProgress(); // Reset the mission progress
            }

            if ($gameType === 'Wheel') {
                $this->resetWheelSpinProgress(); // Reset the wheel spin progress
            }

            // Reset the dates for the next cycle
            $nextStartDate = Carbon::now()->startOfWeek(); // Adjust based on the reset cycle (weekly, daily)
            $nextEndDate = Carbon::now()->endOfWeek(); // Adjust as needed

            // Call resetDate() with new start_date and end_date (example: weekly reset)
            $this->resetDate(new Request([
                'game_type' => $gameType,
                'start_date' => $nextStartDate,
                'end_date' => $nextEndDate,
                'reset_day' => $reset->reset_day, // Maintain the same reset day
            ]));
        }

        return response()->json(['message' => 'Progress reset completed if needed.']);
    }

    /**
     * Reset the mission progress (progress and reward_claimed to 0).
     *
     * @return void
     */
    protected function resetMissionProgress()
    {
        // Reset all user missions related to the 'Mission' game type
        $userMissions = UserMission::where('progress', '>', 0)->get(); // Assuming missions with progress are active

        foreach ($userMissions as $userMission) {
            // Reset the progress and reward_claimed fields
            $userMission->update([
                'progress' => 0,
                'reward_claimed' => false,
            ]);
        }
    }

    /**
     * Reset the wheel spin progress (only reset progress to 0).
     *
     * @return void
     */
    private function resetWheelSpinProgress()
    {
        // Find the mission ID for "Spin the Wheel"
        $wheelspinMission = DB::table('missions')->where('mission_name', 'Spin the Wheel')->first();

        if ($wheelspinMission) {
            // Reset the progress for the "Spin the Wheel" mission
            UserMission::where('mission_id', $wheelspinMission->id)
                ->update(['progress' => 0]);
        } else {
            // If the "Spin the Wheel" mission doesn't exist
            return response()->json(['message' => 'Wheel spin mission not found.'], 404);
        }
    }

}
