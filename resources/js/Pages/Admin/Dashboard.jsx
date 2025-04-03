import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DashboardChart from "@/Components/ChartData";

export default function Dashboard () {
    return (
        <AdminLayout
            title="Dashboard"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Dashboard" }
            ]}
        >   
            <Head title="Admin Dashboard" />
            <h2>Data Analytics</h2>

            <div className="p-6">
                <DashboardChart />
            </div>

            
        </AdminLayout>
    );
};
    
