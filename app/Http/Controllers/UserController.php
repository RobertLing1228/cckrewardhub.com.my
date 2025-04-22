<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

    public function resetPassword(Request $request, Admin $admin)
    {
        $request->validate([
            'current_pass' => 'required|string',
            'new_pass' => 'required|string|min:6',
            'new_pass_confirmation' => 'required|string|min:6',
        ]);

        if (!Hash::check($request->current_pass, $admin->password)) {
            return back()->withErrors(['current_pass' => 'Current password is incorrect.']);
        }

        if ($request->new_pass !== $request->new_pass_confirmation) {
            return back()->withErrors(['new_pass_confirmation' => 'New passwords do not match.']);
        }

        $admin->update([
            'password' => Hash::make($request->new_pass),
        ]);

        return back()->with('success', 'Password reset successfully!');
    }
}
