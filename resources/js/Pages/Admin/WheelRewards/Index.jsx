import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.print.mjs';
import "datatables.net-buttons/js/buttons.html5.mjs";
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';

window.JSZip = jszip;
window.pdfMake = pdfMake;
DataTable.use(DT);

export default function Index({rewards ,flash}) {
    const { delete: destroy } = useForm();

    function updsubmit(e, reward){
      e.preventDefault();
      router.visit(route("wheelrewards.edit", reward));
    }

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
            {flash?.success && (
                <div className="mb-4 p-4 rounded bg-green-200 text-green-800 border border-green-300">
                    ✅ {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mb-4 p-4 rounded bg-red-200 text-red-800 border border-red-300">
                    ❌ {flash.error}
                </div>
            )}
            <div className="p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-end mb-4">
            <Link href="/admin/wheelrewards/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add new Reward </Link>
            </div>
            <div className="overflow-x-auto">
                <DataTable id="wheelRewardsTable" className="min-w-full border border-gray-300"
                options={{
                    dom: 'Bfrtip',
                    buttons: [
                        {
                          extend: 'copy',
                          exportOptions: {
                            columns: ':not(.no-export)' // 👈 magic here
                          }
                        },
                        {
                          extend: 'csv',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }},
                        {
                          extend: 'excel',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'pdf',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'print',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        }
                      ]
                }}>
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Prizes</th>
                    <th className="px-4 py-2 border">Probability</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{reward.id}</td>
                        <td className="px-4 py-2 border">{reward.reward_type}</td>
                        <td className="px-4 py-2 border">{reward.voucher_value ? reward.voucher_value : "Loss"}</td>
                        <td className="px-4 py-2 border">{reward.probability}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updsubmit(e, reward.id)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delsubmit(e, reward.id, reward.id)}  className="bg-red-500 text-white px-3 py-1 rounded">
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
                        