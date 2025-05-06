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

        return response()->json($rewards);
    }

    public function admin()
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
            'reward_type' => 'required|string|max:255|in:voucher,loss',
            'voucher_value' => 'nullable|numeric|required_if:reward_type,voucher',
            'probability' => 'required|numeric|min:0|max:1',
        ]);
    
        WheelReward::create([
            'reward_type' => $fields['reward_type'],
            'voucher_value' => $fields['reward_type'] === 'voucher' ? $fields['voucher_value'] : null,
            'probability' => $fields['probability'],
        ]);

        return redirect('/admin/wheelrewards')->with('success', 'Reward created successfully!');
    }

    public function edit($id)
    {
        $reward = WheelReward::findOrFail($id);
        $vouchers = Vouchers::all();
        return Inertia::render('Admin/WheelRewards/Edit', ['reward' => $reward, 'vouchers' => $vouchers]);
    }

    public function update($id, Request $request){

        $fields = $request->validate([
            'reward_type' => 'required|string|max:255|in:voucher,loss',
            'voucher_value' => 'nullable|numeric|required_if:reward_type,voucher',
            'probability' => 'required|numeric|min:0|max:1',
        ]);
    
        $reward = WheelReward::find($id);
        $reward->update([
            'reward_type' => $fields['reward_type'],
            'voucher_value' => $fields['reward_type'] === 'voucher' ? $fields['voucher_value'] : null,
            'probability' => $fields['probability'],
        ]);

        return redirect('/admin/wheelrewards')->with('success', 'Reward updated successfully!');
    }

    public function delete($id)
    {
        $reward=WheelReward::find($id);
        $reward->delete();
        return redirect('/admin/wheelrewards')->with('success', 'Reward deleted successfully!');
    }
}
