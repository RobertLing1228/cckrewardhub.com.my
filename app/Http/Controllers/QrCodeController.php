<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class QrCodeController extends Controller
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
        ]);

        QrCode::create([
            'qr_type' => $fields['qr_type'],
            'product_id' => $fields['productID'],
            'qr_value' => $fields['qr_value'],
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
        ]);

        $qrcode->update([
            'qr_type' => $fields['qr_type'],
            'product_id' => $fields['productID'],
            'qr_value' => $fields['qr_value'],
        ]);

        return redirect('/admin/qrcodes')->with('success', 'QR Code updated successfully!');
    }

    public function delete(QrCode $qrcode) {
        $qrcode->delete();
        return redirect('/admin/qrcodes')->with('success', 'QR Code deleted successfully!');
    }


}
