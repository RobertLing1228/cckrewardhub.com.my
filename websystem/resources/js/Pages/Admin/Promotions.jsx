import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Promotions ({ promotions }) {
    return (
        <AdminLayout
            title="Promotions List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Promotions" }
            ]}
        >
            <Head title="Promotions List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">ProductID</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Start Date</th>
                    <th className="px-4 py-2 border">End Date</th>
                    <th className="px-4 py-2 border">Code</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion) => (
                    <tr key={promotion.promotionID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{promotion.promotionID}</td>
                        <td className="px-4 py-2 border">{promotion.productID}</td>
                        <td className="px-4 py-2 border">{promotion.title}</td>
                        <td className="px-4 py-2 border truncate max-w-[150px]">
                        {promotion.description}
                        </td>
                        <td className="px-4 py-2 border">{promotion.start_date}</td>
                        <td className="px-4 py-2 border">{promotion.end_date}</td>
                        <td className="px-4 py-2 border">{promotion.code}</td>
                        <td className="px-4 py-2 border">
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
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
        
        
        
        </AdminLayout>
    );
}