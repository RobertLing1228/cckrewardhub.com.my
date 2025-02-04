<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;

class UserController extends Controller
{
    public function admin(){
        $admin = Admin::all();
        $member = ExistingMember::all();
        return inertia('Admin/Users', ['admins' => $admin, 'members' => $member]);
    }
}
