<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ExistingMember;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    public function admin(){
        $admin = Admin::all();
        $member = ExistingMember::all();
        return inertia('Admin/Users', ['admins' => $admin, 'members' => $member]);
    }

    public function checkMember(Request $request)
    {
        $request->validate([
            'memberID' => 'required|string|size:10|regex:/^\d+$/',
            'phoneNumber' => 'required|string|size:10|regex:/^\d+$/',
            'currentDate' => 'required|date_format:Y-m-d',
        ]);

        $memberID = $request->memberID;
        $phoneNumber = $request->phoneNumber;
        $currentDate = $request->currentDate;

        // Check if the member exists in 'exist_member' table
        $memberExists = DB::table('exist_member')
            ->where('memberID', $memberID)
            ->where('phoneNumber', $phoneNumber)
            ->exists();

        if (!$memberExists) {
            return response()->json(['status' => false, 'message' => 'Invalid Member ID or Phone Number.']);
        }

        // Check if the member exists in 'user' table
        $userExists = DB::table('user')
            ->where('memberID', $memberID)
            ->where('phoneNumber', $phoneNumber)
            ->exists();

        if (!$userExists) {
            // Add member to 'user' table
            DB::table('user')->insert([
                'memberID' => $memberID,
                'phoneNumber' => $phoneNumber
            ]);
        }

        // Check last claim date
        $lastClaim = DB::table('claim')
            ->where('memberID', $memberID)
            ->orderBy('claim_date', 'desc')
            ->first();

        if ($lastClaim) {
            $lastClaimDate = Carbon::parse($lastClaim->claim_date);
            $currentDateObj = Carbon::parse($currentDate);

            if ($lastClaimDate->isSameDay($currentDateObj)) {
                return response()->json(['status' => true, 'message' => 'Claim already made today.']);
            }
        }

        // Add claim if eligible
        DB::table('claim')->insert([
            'memberID' => $memberID,
            'gameID' => "",
            'claim_date' => $currentDate,
            'status' => 'successful'
        ]);

        return response()->json(['status' => true, 'message' => 'Claim successful.']);
    }
}
