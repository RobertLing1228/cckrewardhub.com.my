<?php

namespace App\Http\Controllers;

use App\Models\ExistingMember;
use Illuminate\Http\Request;

class ExistMemController extends Controller
{
    public function admin(){
        $member = ExistingMember::all();
        return inertia('Admin/ExistingMember', ['members' => $member]);
    }
}
