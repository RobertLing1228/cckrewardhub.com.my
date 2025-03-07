<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function admin(){
        $admin = Admin::all();
        $member = ExistingMember::all();
        return inertia('Admin/Users/Index', ['admins' => $admin, 'members' => $member]);
    }

    public function checkMember(Request $request)
    {
        $request->validate([
            'memberID' => 'required|string',
            'phoneNumber' => 'required|string',
        ]);

        $memberID = $request->memberID;
        $phoneNumber = $request->phoneNumber;

        // Check if the member exists in 'exist_member' table
        $memberExists = DB::table('exist_member')
            ->where('memberID', $memberID)
            ->where('phoneNum', $phoneNumber)
            ->exists();

        if ($memberExists) {
            // Check if the member already exists in 'user' table
            $userExists = DB::table('user')
                ->where('memberID', $memberID)
                ->where('phoneNumber', $phoneNumber)
                ->exists();

            if (!$userExists) {
                // Insert into 'user' table
                DB::table('user')->insert([
                    'memberID' => $memberID,
                    'phoneNumber' => $phoneNumber
                ]);

                return redirect()->back()->with('success', 'Member found and added to user table.');
            }

            return redirect()->back()->with('error', 'Member exists, but already in user table.');
        }

        return redirect()->back()->with('error', 'Invalid Member ID or Phone Number.');
    }
}
