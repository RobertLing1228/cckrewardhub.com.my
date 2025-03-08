import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

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
            <h2>Welcome to the Dashboard</h2>
        </AdminLayout>
    );
};
    
