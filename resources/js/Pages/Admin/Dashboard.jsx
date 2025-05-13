import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardChart from "@/Components/ChartData";
import ResetTimer from "@/Components/ResetTimer";
import Chart from "@/Components/UserChartData";
import Modal from "@/Components/Modal";

export default function Dashboard({ resetTimes, todayLogins, weeklyLogins, monthlyLogins, loginDetailsToday, chartData, loginsPerMonthData }) {
    const loginStats = {
        today: todayLogins,
        week: weeklyLogins,
        month: monthlyLogins
    };

    return (
        <AdminLayout
            title="Dashboard"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Dashboard" }
            ]}
        >
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-4 px-6 mb-4">
                <ResetTimer label="Mission" time={resetTimes?.mission} isWeekly={true} />
                <ResetTimer label="Wheel" time={resetTimes?.wheel} />
            </div>

            <h2>Data Analytics</h2>

            {/* User Login stats */}
            <div className="px-6 mb-6">
                <div
                    className=" bg-white rounded-lg shadow-md p-4"
                >
                    <h2 className="text-xl font-semibold mb-2">Unique Logins Today</h2>
                    <div className="text-5xl font-bold text-blue-600">{loginStats.today}</div>
                    <div className="text-sm text-gray-600 mt-2">
                        <span className="block">This Week: {loginStats.week}</span>
                        <span className="block">This Month: {loginStats.month}</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <DashboardChart loginsPerMonthData={loginsPerMonthData} />
            </div>

            
        </AdminLayout>
    );
};
