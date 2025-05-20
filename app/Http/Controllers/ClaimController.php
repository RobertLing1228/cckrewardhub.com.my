<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Claim;
use App\Models\Vouchers;
use App\Models\UserMission;
use App\Models\UserVouchers;
use Illuminate\Support\Facades\Auth;


class ClaimController extends Controller
{
    
    public function index(){
        $claims = Claim::all();
        return inertia('Admin/Claim/Index', ['claims' => $claims]);
    }

    public function delete(Claim $claim){
        $claim->delete();
        return redirect('admin/claims')->with('success', 'Claim deleted successfully.');
    }

    public function claim(Request $request)
    {

        $user = Auth::user();
        $gameType = $request->gameType;
        $prize = $request->prize;
        $isMission = false;

        $claim = Claim::create([
            'memberID' => $user->memberID,
            'voucherID' => null,
            'gameType' => $gameType,
            'claim_date' => now(),
            'status' => 'pending',
        ]);

        $discountValue = null;
        $successMsg = "You have successfully claimed an RM3 Cash Voucher!";

        if ($gameType === 'Wheel') {
            $discountValue = $prize;
            $successMsg = "You have successfully claimed an RM{$discountValue} Cash Voucher!";
        } else {
            $discountValue = '3.00';
            $isMission = true;
        }

        // Check if there's an available voucher
        $voucher = Vouchers::where('discount_type', 'fixed')
                            ->where('discount_value', $discountValue)
                            ->where('status', 'unclaimed')
                            ->first();

        
        if (!$voucher) {
            $claim->update(['status' => 'failed']);
            return back()->with('error', 'No Cash Vouchers available. Try again later!');
        }

        // Assign the voucher to the user
        UserVouchers::create([
            'userID' => $user->userID,
            'voucher_ID' => $voucher->id,
            'status' => 'claimed',
            'claimed_at' => now(),
        ]);

        $claim->update(['voucherID' => $voucher->id, 'status' => 'successful']);


        $voucher->update(['status' => 'claimed']);

        $isMission ? UserMission::where('user_id', $user->userID)->update(['reward_claimed' => true]) : null;

        return back()->with('success', $successMsg);
    }
}
