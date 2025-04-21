import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Claims ({ claims }) {
    const { delete: destroy } = useForm();

    function updsubmit(e, claim){
        e.preventDefault();

        router.visit(route('admin.claims.edit', claim));
    }

    function delsubmit(e, claim, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the claim from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("admin.claims.delete", claim));
                Swal.fire("Deleted!", "The claim has been removed.", "success");
            }
        });
    }

    return (
        <AdminLayout
            title="Claims List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Claims" }
            ]}
        >   
            <Head title="Claims List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
                <DataTable id="claimsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">MemberID</th>
                    <th className="px-4 py-2 border">Game Type</th>
                    <th className="px-4 py-2 border">Claim Date</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {claims.map((claim) => (
                    <tr key={claim.claimID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{claim.claimID}</td>
                        <td className="px-4 py-2 border">{claim.memberID}</td>
                        <td className="px-4 py-2 border">{claim.gameType}</td>
                        <td className="px-4 py-2 border">{claim.claim_date}</td>
                        <td className="px-4 py-2 border">{claim.status}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updsubmit(e, claim)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delsubmit(e, claim, claim.claimID)}  className="bg-red-500 text-white px-3 py-1 rounded">
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
};