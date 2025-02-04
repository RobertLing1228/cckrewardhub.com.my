import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Users ({ admins, members }) {
    return (
        <AdminLayout
            title="Users List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Users" }
            ]}
        >
            <Head title="Users List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Existing Members</h2>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">MemberID</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                    <tr key={member.existsmemID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{member.existsmemID}</td>
                        <td className="px-4 py-2 border">{member.memberID}</td>
                        <td className="px-4 py-2 border">{member.phoneNumber}</td>
                        <td className="px-4 py-2 border">
                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </DataTable>
            </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Admins</h2>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Password</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                    <tr key={admin.adminID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{admin.adminID}</td>
                        <td className="px-4 py-2 border">{admin.name}</td>
                        <td className="px-4 py-2 border">{admin.pass}</td>
                        <td className="px-4 py-2 border">
                        <button className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </DataTable>
            </div>
        
        
        
        </AdminLayout>
    );
}