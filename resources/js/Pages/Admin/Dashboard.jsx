import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardChart from "@/Components/ChartData";
import ResetTimer from "@/Components/ResetTimer";
import Chart from "@/Components/UserChartData";
import Modal from "@/Components/Modal";

export default function Dashboard({ resetTimes, loginData = {}, missionData = {}, claimData = {} }) {

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
            

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {/* User Login stats */}
                <div className="px-6 mb-6">
                    <div
                        className=" bg-white rounded-lg shadow-md p-4"
                    >
                        <h3 className="text-lg font-semibold mb-2">Unique Logins Today</h3>
                        <div className="text-5xl font-bold text-blue-600">{loginData.today}</div>
                        <div className="text-sm text-gray-600 mt-2">
                            <span className="block">This Week: {loginData.weekly}</span>
                            <span className="block">This Month: {loginData.monthly}</span>
                        </div>
                    </div>
                </div>

                {/* Mission Completion stats */}
                <div className="px-6 mb-6">
                    <div
                        className=" bg-white rounded-lg shadow-md p-4"
                    >
                        <h3 className="text-lg font-semibold mb-2">Mission Completed Weekly</h3>
                        <div className="text-5xl font-bold text-blue-600">{missionData.weekly}</div>
                        <div className="text-sm text-gray-600 mt-2">
                            <span className="block">Today: {missionData.today}</span>
                            <span className="block">This Month: {missionData.monthly}</span>
                        </div>
                    </div>
                </div>

                {/* Reward Claim stats */}
                <div className="px-6 mb-6">
                    <div
                        className=" bg-white rounded-lg shadow-md p-4"
                    >
                        <h3 className="text-lg font-semibold mb-2">Reward Claims Today</h3>
                        <div className="text-5xl font-bold text-blue-600">{claimData.today}</div>
                        <div className="text-sm text-gray-600 mt-2">
                            <span className="block">Successful Claims: {claimData.successfulToday}</span>
                            <span className="block">Failed Claims: {claimData.failedToday}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <DashboardChart loginsPerMonthData={loginData.perMonth} missionsPerMonthData={missionData.perMonth} sucessfulClaim={claimData.successfulToday} failedClaim={claimData.failedToday} />
            </div>

            
        </AdminLayout>
    );
};
