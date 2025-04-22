<?php

namespace App\Http\Controllers;

use App\Models\QRCode;
use App\Models\UserMission;
use App\Models\User;
use App\Models\Mission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QRCodeController extends Controller
{
    public function scan(Request $request)
{
    $qrValue = $request->input('qr_value');

    $qr = QrCode::where('qr_value', $qrValue)->first();

    if ($qr) {
        return response()->json(['message' => 'QR code scanned successfully!']);
    } else {
        return response()->json(['message' => 'Invalid QR code.'], 400);
    }
}

}
