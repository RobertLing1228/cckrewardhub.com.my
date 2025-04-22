import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardChart from "@/Components/ChartData";
import ResetTimer from "@/Components/ResetTimer";

export default function Dashboard ({resetTimes}) {

    console.log(resetTimes);
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
                <ResetTimer label="Wheel" time={resetTimes?.wheel}  />
            </div>

            <h2>Data Analytics</h2>
            <div className="p-6">
                <DashboardChart />
            </div>

            
        </AdminLayout>
    );
};
    
