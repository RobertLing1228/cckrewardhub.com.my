<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ResetTimes;
use App\Models\LoginLog;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard(){
        $resetTimes = ResetTimes::all()->pluck('reset_time', 'game_type');
        $todayLogins = LoginLog::whereDate('logged_in_at', today())
                    ->distinct('user_id')
                    ->count('user_id');

        $weeklyLogins = LoginLog::where('logged_in_at', '>=', Carbon::now()->startOfWeek())
                        ->distinct('user_id')
                        ->count('user_id');

        $monthlyLogins = LoginLog::where('logged_in_at', '>=', Carbon::now()->startOfMonth())
                        ->distinct('user_id')
                        ->count('user_id');

        $loginDetailsToday = LoginLog::with('user')
                            ->whereDate('logged_in_at', today())
                            ->orderBy('logged_in_at', 'desc')
                            ->get();

        $chartData = LoginLog::selectRaw('DATE(logged_in_at) as date, COUNT(DISTINCT user_id) as count')
                    ->where('logged_in_at', '>=', Carbon::now()->subDays(30))
                    ->groupBy('date')
                    ->orderBy('date')
                    ->get();

        $loginsPerMonth = LoginLog::selectRaw('MONTH(logged_in_at) as month, COUNT(DISTINCT user_id) as count')
                        ->whereYear('logged_in_at', now()->year)
                        ->groupBy('month')
                        ->orderBy('month')
                        ->get()
                        ->pluck('count', 'month'); // Key = month (1-12), value = count

        $loginsPerMonthData = [];

        for ($i = 1; $i <= 12; $i++) {
            $loginsPerMonthData[] = $loginsPerMonth->get($i, 0);
        }

        return Inertia::render('Admin/Dashboard', [
            'resetTimes' => $resetTimes,
            'todayLogins' => $todayLogins,
            'weeklyLogins' => $weeklyLogins,
            'monthlyLogins' => $monthlyLogins,
            'loginDetailsToday' => $loginDetailsToday,
            'chartData' => $chartData,
            'loginsPerMonthData' => $loginsPerMonthData
        ]);
    }
}
