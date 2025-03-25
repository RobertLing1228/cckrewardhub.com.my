<?php

namespace App\Http\Controllers;

use App\Models\Vouchers;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function admin(){
        $vouchers = Vouchers::all();
        return inertia('Admin/Vouchers/Index', ['vouchers' => $vouchers]);
    }

    public function index(){
        $vouchers = Vouchers::all();
        return inertia('User/Vouchers/Index', ['vouchers' => $vouchers]);
    }

    public function create()
    {
        return inertia('Admin/Vouchers/Add');
    }

    public function claim(){
        return inertia('User/Vouchers/Claim');
    }

}
