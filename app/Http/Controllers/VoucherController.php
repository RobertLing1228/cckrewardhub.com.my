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

}
