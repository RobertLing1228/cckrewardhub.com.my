<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class QRCodeController extends Controller
{
    public function admin() {
        $qr_codes = QrCode::all();
        return Inertia::render('Admin/QrCodes/Index', ['qr_codes' => $qr_codes]);
    }

    public function create() {
        $products = Product::all();
        return Inertia::render('Admin/QrCodes/Add', ['products' => $products]);
    }

    public function store(Request $request) {
        $fields = $request->validate([
            'qr_type' => 'required|string',
            'productID' => 'nullable|integer|exists:products,productID',
            'qr_value' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        QrCode::create([
            'qr_type' => $fields['qr_type'],
            'product_id' => $fields['productID'],
            'qr_value' => $fields['qr_value'],
            'is_active' => $fields['is_active'],
        ]);

        return redirect('/admin/qrcodes')->with('success', 'QR Code created successfully!');
    }

    public function edit(QrCode $qrcode) {
        $products = Product::all();
        return Inertia::render('Admin/QrCodes/Edit', ['qrcode' => $qrcode, 'products' => $products]);
    }

    public function update(Request $request, QrCode $qrcode) {
        $fields = $request->validate([
            'qr_type' => 'required|string',
            'productID' => 'nullable|integer|exists:products,productID',
            'qr_value' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $qrcode->update([
            'qr_type' => $fields['qr_type'],
            'product_id' => $fields['productID'],
            'qr_value' => $fields['qr_value'],
            'is_active' => $fields['is_active'],
        ]);

        return redirect('/admin/qrcodes')->with('success', 'QR Code updated successfully!');
    }

    public function delete(QrCode $qrcode) {
        $qrcode->delete();
        return redirect('/admin/qrcodes')->with('success', 'QR Code deleted successfully!');
    }

    public function scan(Request $request)
{
    $qrValue = $request->input('qr_value');

    $qr = QrCode::where('qr_value', $qrValue)
                ->where('is_active', true)
                ->first();

    if ($qr) {
        return response()->json(['message' => 'QR code scanned successfully!']);
    } else {
        return response()->json(['message' => 'Invalid or inactive QR code.'], 400);
    }
    
}

    public function validate(Request $request) {
        $text = $request->input('text');

    // Check if the QR text exists in the database
        $exists = QrCode::where('qr_value', $text)->exists();

        return response()->json([
            'valid' => $exists,
        ]);
    }



}
