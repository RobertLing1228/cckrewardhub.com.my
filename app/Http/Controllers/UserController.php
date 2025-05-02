<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;

class UserController extends Controller
{
    public function admin(){
        $admin = Admin::all();
        $member = ExistingMember::all();
        return inertia('Admin/Users/Index', ['admins' => $admin, 'members' => $member]);
    }

    public function create(){
        return inertia('Admin/Users/Add');
    }

    public function store(Request $request){
        $fields = $request->validate([
            'memberID' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
        ]);

        ExistingMember::create([
            'memberID' => $fields['memberID'],
            'phoneNumber' => $fields['phoneNumber'],
        ]);

        return redirect('/admin/users')->with('success', 'Member created successfully!');
        
    }

    public function edit($id){
        $member = ExistingMember::find($id);
        return inertia('Admin/Users/Edit', [
            'member' => $member
        ]);
    }

    public function update($id, Request $request){
        $fields = $request->validate([
            'memberID' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
        ]);

        $member = ExistingMember::find($id);
        $member->update([
            'memberID' => $fields['memberID'],
            'phoneNumber' => $fields['phoneNumber'],
        ]);

        return redirect('/admin/users')->with('success', 'Member updated successfully!');

    }

    public function delete($id){
        $member = ExistingMember::find($id);
        $member->delete();
        return redirect('/admin/users')->with('success', 'Member deleted successfully!');
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

    public function checkMember(Request $request){
        $phoneNumber = $request->input('phoneNumber');
        $member = ExistingMember::where('phoneNumber', $phoneNumber)->first();

        if(!$member){
            return response()->json(['message' => 'Member not found'], 404);
        }
        return response()->json($member);
    }
}
