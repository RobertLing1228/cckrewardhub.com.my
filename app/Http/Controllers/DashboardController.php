<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ResetTimes;
use App\Models\LoginLog;
use App\Models\MissionCompletionLog;
use App\Models\Claim;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard(){
        $resetTimes = ResetTimes::all()->pluck('reset_time', 'game_type');

        $loginData = $this->getLoginData();
        $missionData = $this->getMissionData();
        $claimData = $this->getClaimData();

        return Inertia::render('Admin/Dashboard', [
            'resetTimes' => $resetTimes,
            'loginData' => $loginData,
            'missionData' => $missionData,
            'claimData' => $claimData,
        ]);
    }

    private function getLoginData(){
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
            ->pluck('count', 'month');

        $loginsPerMonthData = [];
        for ($i = 1; $i <= 12; $i++) {
            $loginsPerMonthData[] = $loginsPerMonth->get($i, 0);
        }

        return [
            'today' => $todayLogins,
            'weekly' => $weeklyLogins,
            'monthly' => $monthlyLogins,
            'detailsToday' => $loginDetailsToday,
            'perDay' => $chartData,
            'perMonth' => $loginsPerMonthData,
        ];
    }


    private function getMissionData() {
        $missionCompletionsPerMonth = MissionCompletionLog::selectRaw('MONTH(date_completed) as month, COUNT(*) as count')
        ->whereYear('date_completed', now()->year)
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->pluck('count', 'month');

        $completionsPerMonthData = [];
        for ($i = 1; $i <= 12; $i++) {
            $completionsPerMonthData[] = $missionCompletionsPerMonth->get($i, 0);
        }
        return [
            'today' => MissionCompletionLog::whereDate('date_completed', today())->count(),
            'weekly' => MissionCompletionLog::where('date_completed', '>=', Carbon::now()->startOfWeek())->count(),
            'monthly' => MissionCompletionLog::where('date_completed', '>=', Carbon::now()->startOfMonth())->count(),
            'perDay' => MissionCompletionLog::selectRaw('DATE(date_completed) as date, COUNT(*) as count')
                ->where('date_completed', '>=', Carbon::now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            'perMonth' => $completionsPerMonthData
        ];
    }

    private function getClaimData() {
        return [
            'today' => Claim::whereDate('claim_date', today())->count(),
            'successfulToday' => Claim::whereDate('claim_date', today())->where('status', 'successful')->count(),
            'failedToday' => Claim::whereDate('claim_date', today())->where('status', 'failed')->count(),
            'byType' => Claim::selectRaw('gameType, COUNT(*) as count')->groupBy('gameType')->get(),
            'successRate' => Claim::selectRaw('status, COUNT(*) as count')->groupBy('status')->get(),
        ];
    }
}
