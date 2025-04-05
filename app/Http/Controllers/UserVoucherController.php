<?php

namespace App\Http\Controllers;
use App\Models\UserVouchers;
use Illuminate\Http\Request;

class UserVoucherController extends Controller
{
    public function admin(){
        $vouchers = UserVouchers::all();
        return inertia('Admin/UserVouchers', ['vouchers' => $vouchers]);
    }
}