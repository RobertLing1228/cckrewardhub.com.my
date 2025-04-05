<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function admin(){
        $admin = Admin::all();
        $member = ExistingMember::all();
        return inertia('Admin/Users', ['admins' => $admin, 'members' => $member]);
    }

    public function profile(){
        $admin = Auth::guard('admin')->user();
        return inertia('Admin/Profile', [
            'admin' => $admin
        ]);
    }

    public function updateProfile(Request $request, Admin $admin){
        $fields = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        $admin->update($fields);

        return redirect('/admin/profile')->with('success', 'Profile updated successfully!');
    }
}
