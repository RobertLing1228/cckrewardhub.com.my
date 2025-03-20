<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AdminAuthController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/AdminLogin', [
            'status' => session('status'),
        ]); // Create a login page for admins
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['error' => 'Invalid credentials']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
