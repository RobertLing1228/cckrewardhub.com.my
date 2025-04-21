import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Index({rewards}) {
    const { delete: destroy } = useForm();

    function delsubmit(e, reward, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the reward from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("wheelrewards.delete", reward));
                Swal.fire("Deleted!", "The reward has been removed.", "success");
            }
        });
    }

    return (
        <AdminLayout
            title="Wheel Rewards"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Wheel Rewards" },
            ]}
        >
            <Head title="Wheel Rewards" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <Link href="/admin/wheelrewards/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add new Reward </Link>
            <div className="overflow-x-auto">
                <DataTable id="wheelRewardsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Voucher ID</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{reward.id}</td>
                        <td className="px-4 py-2 border">{reward.reward_type}</td>
                        <td className="px-4 py-2 border">{reward.voucher_id}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updsubmit(e, reward)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delsubmit(e, reward, reward.id)}  className="bg-red-500 text-white px-3 py-1 rounded">
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
    )
}
                        