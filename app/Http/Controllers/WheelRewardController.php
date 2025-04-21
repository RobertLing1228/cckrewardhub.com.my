<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WheelReward;
use App\Models\Vouchers;
use Inertia\Inertia;

class WheelRewardController extends Controller
{
    public function index()
    {
        $rewards = WheelReward::all();
        
        return Inertia::render('Admin/WheelRewards/Index', ['rewards' => $rewards]);
    }

    public function create()
    {
        $vouchers = Vouchers::all();
        return Inertia::render('Admin/WheelRewards/Add', ['vouchers' => $vouchers]);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'reward_type' => 'required|string|max:255',
            'voucher_value' => 'nullable|numeric',
        ]);

        WheelReward::create([
            'reward_type' => $fields['reward_type'],
            'voucher_value' => $fields['voucher_value'],
        ]);

        return redirect('/admin/wheelrewards')->with('success', 'Reward created successfully!');
    }

    public function delete(WheelReward $reward)
    {
        $reward->delete();
        return redirect('/admin/wheelrewards')->with('success', 'Reward deleted successfully!');
    }
}
