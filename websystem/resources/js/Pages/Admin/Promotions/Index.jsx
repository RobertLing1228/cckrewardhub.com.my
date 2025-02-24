import React from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Promotions ({ promotions }) {
    const { delete: destroy } = useForm();
    
        function updsubmit(e, promotion){
            e.preventDefault();
    
            router.visit(route('promotions.edit', promotion));
        }
    
        function delsubmit(e, promotion) {
            e.preventDefault();
        
            Swal.fire({
                title: 'Delete "' + promotion.title + '" ?',
                text: "This will remove the promotion from the list.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route("promotions.delete", promotion));
                    Swal.fire("Deleted!", "The promotion has been removed.", "success");
                }
            });
        }

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
                <Link href="/admin/games/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Create Promotion </Link>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border ">ID</th>
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
                        <button onClick={(e) => updsubmit(e, promotion)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
                        <button onClick={(e) => delsubmit(e, promotion)} className="bg-red-500 text-white px-3 py-1 rounded">
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