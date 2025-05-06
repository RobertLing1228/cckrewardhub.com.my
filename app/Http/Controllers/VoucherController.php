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

        // Get the vouchers for the current user, including their status and end_date
        $vouchers = Vouchers::join('user_vouchers', 'vouchers.id', '=', 'user_vouchers.voucher_ID')
            ->where(function($query) use ($user) {
                $query->where('user_vouchers.userID', $user->userID)
                    ->where(function($subQuery) {
                        $subQuery->where(function($q) {
                            $q->where('user_vouchers.status', 'claimed')
                                ->where('vouchers.end_date', '>=', now());
                        })
                        ->orWhere(function($q) {
                            $q->where('user_vouchers.status', 'used')
                                ->orWhere('vouchers.end_date', '<', now());
                        });
                    });
            })
            ->get();

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

    public function edit($id){
        $voucher = Vouchers::find($id);
        return inertia('Admin/Vouchers/Edit', ['voucher' => $voucher]);
    }

    public function update(Vouchers $voucher, Request $request){

        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:8',
            'date_issued' => 'nullable|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:date_issued',
            'status' => 'required|string|in:unclaimed,claimed',
            'discount_type' => 'required|string|in:fixed,percentage',
            'discount_value' => 'required|numeric',
        ]);

        $date_issued = $request->date_issued ?? now()->toDateString();

        $voucher->update([
            'code' => $fields['code'],
            'name' => $fields['name'],
            'date_issued' => $date_issued,
            'end_date' => $fields['end_date'],
            'status' => $fields['status'],
            'discount_type' => $fields['discount_type'],
            'discount_value' => $fields['discount_value'],
        ]);

        return redirect('/admin/vouchers')->with('success', 'Voucher updated successfully.');


    }

    public function delete(Vouchers $voucher){
        $voucher->delete();

        return redirect('/admin/vouchers')->with('success', 'Voucher deleted successfully!');
    }

    public function markAsUsed($id){
        $voucher = UserVouchers::where('voucher_ID', $id)->first();
        $voucher->update(['status' => 'used', 'used_at' => now()]);
        return redirect('/vouchers')->with('success', 'Voucher marked as used successfully.');
    }
}
