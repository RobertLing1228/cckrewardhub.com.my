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

export default function QRCodes({user_missions, flash}) {
    const { delete: destroy } = useForm();
        
    function updsubmit(e, mission){
        console.log(mission);
        e.preventDefault();

        router.visit(route('usermissions.edit', mission));
    }

    function delsubmit(e, mission, name) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + name + '" ?',
            text: "This will remove the mission from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("missions.delete", mission), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "The mission has been removed.", "success");
                    },
                    onError: () => {
                        Swal.fire("Failed!", "Something went wrong. mission not deleted.", "error");
                    }
                });
            }
        });
    }

    return (
        <AdminLayout
            title="User Mission List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "User Missions" }
            ]}
        >
            
            <Head title="User Missions" />
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
                <Link href="/admin/usermissions/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Create User Mission </Link>
                <div className="overflow-x-auto">
                {user_missions && user_missions.length > 0 && (
                    <DataTable id="quserMissionsTable" className="min-w-full border border-gray-300"
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
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">Mission ID</th>
                                <th className="px-4 py-2">Progress</th>
                                <th className="px-4 py-2">Reward Claimed</th>
                                <th className="px-4 py-2 no-export">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {user_missions.map((m) => {
                            return (
                                <tr key={m.id}>
                                    <td className="px-4 py-2">{m.id}</td>
                                    <td className="px-4 py-2">{m.user_id}</td>
                                    <td className="px-4 py-2">{m.mission_id || "N/A"}</td>
                                    <td className="px-4 py-2">{m.progress}</td>
                                    <td className="px-4 py-2">{m.reward_claimed}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={(e) => updsubmit(e, m.id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => delsubmit(e, m, m.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </DataTable>
                )}
                </div>
            </div>
        </AdminLayout>
    )
}