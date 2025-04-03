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
    $gameID = $request->gameID;

    $claim = Claim::create([
        'memberID' => $user->memberID,
        'voucherID' => '',
        'gameID' => $gameID,
        'claim_date' => now(),
        'status' => 'pending',
    ]);

    // Find an available RM5 Cash Voucher
    $voucher = Vouchers::where('discount_type', 'fixed')
                        ->where('discount_value', '5.00')
                        ->where('status', 'active')
                        ->first();

    // Check if there's an available voucher
    if (!$voucher) {
        $claim->update(['status' => 'failed']);
        return back()->with('error', 'No RM5 Cash Vouchers available. Try again later!');
    }

    // Assign the voucher to the user
    UserVouchers::create([
        'userID' => $user->memberID,
        'voucher_ID' => $voucher->id,
        'status' => 'active',
        'claimed_at' => now(),
    ]);

    $claim->update(['voucher_id' => $voucher->id, 'status' => 'claimed']);

    //Mark the voucher as claimed
    $voucher->update(['status' => 'claimed']);

    Claim::create([
        'voucherID' => $voucher->id,
        'memberID' => $user->memberID,  // Assuming memberID is the same as userID
        'gameID' => null,          // If gameID is required, update this accordingly
        'claimDate' => now(),
        'status' => 'claimed',
    ]);

    return back()->with('success', 'You have successfully claimed an RM5 Cash Voucher!');
}
}
