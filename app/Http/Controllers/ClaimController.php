<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Claim;
use App\Models\Vouchers;
use App\Models\UserVouchers;
use Illuminate\Support\Facades\Auth;


class ClaimController extends Controller
{
    
    public function index(){
        $claims = Claim::all();
        return inertia('Admin/Claim/Index', ['claims' => $claims]);
    }

    public function claim(Request $request)
    {

        $user = Auth::user();
        $gameType = $request->gameType;

        $claim = Claim::create([
            'memberID' => $user->memberID,
            'voucherID' => null,
            'gameType' => $gameType,
            'claim_date' => now(),
            'status' => 'pending',
        ]);

        // Find an available RM5 Cash Voucher
        $voucher = Vouchers::where('discount_type', 'fixed')
                            ->where('discount_value', '3.00')
                            ->where('status', 'unclaimed')
                            ->first();

        // Check if there's an available voucher
        if (!$voucher) {
            $claim->update(['status' => 'failed']);
            return back()->with('error', 'No RM5 Cash Vouchers available. Try again later!');
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

        return back()->with('success', 'You have successfully claimed an RM5 Cash Voucher!');
    }
}
