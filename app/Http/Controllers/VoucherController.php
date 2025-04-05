<?php

namespace App\Http\Controllers;

use App\Models\Vouchers;
use App\Models\UserVouchers;
use App\Models\Claim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoucherController extends Controller
{
    public function admin(){
        $vouchers = Vouchers::all();
        return inertia('Admin/Vouchers/Index', ['vouchers' => $vouchers]);
    }

    public function index(){
        $user = Auth::user();
        $user_vouchers = UserVouchers::where('userID', $user->userID)->pluck('voucher_ID');
        $vouchers = Vouchers::whereIn('id', $user_vouchers)->get();
        return inertia('User/Vouchers/Index', ['vouchers' => $vouchers]);
    }

    public function create()
    {
        return inertia('Admin/Vouchers/Add');
    }

    public function show($id){    
        $voucher = Vouchers::where('id', $id)->first();
        return inertia('User/Vouchers/Show', ['voucher' => $voucher]);
    }

    public function store(Request $request){

        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:8',
            'date_issued' => 'nullable|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:date_issued',
            'status' => 'required|string|in:unclaimed,claimed',
            'discount_type' => 'required|string|in:fixed,percentage',
            'discount_value' => 'required|numeric',
            
        ]);

        $date_issued = $request->date_issued ?? now()->toDateString();

        Vouchers::create([
            'name' => $request->name,
            'code' => $request->code,
            'date_issued' => $date_issued,
            'end_date' => $request->end_date,
            'status' => $request->status,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
        ]);

        return redirect('/admin/vouchers')->with('success', 'Voucher created successfully.');
    }

    public function markAsUsed($id){
        $voucher = UserVouchers::where('id', $id)->first();
        $voucher->update(['status' => 'used']);
        return back()->with('success', 'Voucher marked as used successfully.');
    }
}
