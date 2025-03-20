<?php

namespace App\Http\Controllers;

use App\Models\Vouchers;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function admin(){
        $vouchers = Vouchers::all();
        return inertia('Admin/Games/Index', ['vouchers' => $vouchers]);
    }

    public function index(){
        $vouchers = Vouchers::all();
        return inertia('User/Vouchers/Index', ['vouchers' => $vouchers]);
    }


}
