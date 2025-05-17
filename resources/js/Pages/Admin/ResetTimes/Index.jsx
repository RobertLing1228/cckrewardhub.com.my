import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';
import ResetTimer from "@/Components/ResetTimer";
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.print.mjs';
import "datatables.net-buttons/js/buttons.html5.mjs";
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';

window.JSZip = jszip;
window.pdfMake = pdfMake;
DataTable.use(DT);

export default function ResetTimes({resetTimes, flash}) {
    const { delete: destroy } = useForm();

    function updsubmit(e, r){
        e.preventDefault();
        router.visit(route("resettimes.edit", r));
    }
    function delsubmit(e, r, name) {
            e.preventDefault();
        
            Swal.fire({
                title: 'Delete "' + name + '" ?',
                text: "This will remove the QRCode from the list.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route("resettimes.delete", r), {
                        onSuccess: () => {
                            Swal.fire("Deleted!", "The Timer has been removed.", "success");
                        },
                        onError: () => {
                            Swal.fire("Failed!", "Something went wrong. Timer not deleted.", "error");
                        }
                    });
                }
            });
        }

    return (
        <AdminLayout
            title="Reset Times List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Reset Times" }
            ]}
        >
            <Head title="Reset Times List" />
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
            

            <Link href="/admin/resettimes/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add Reset Timer </Link>
            <div className="overflow-x-auto">
                {resetTimes && resetTimes.length > 0 && (
                    <DataTable id="qrcodesTable" className="min-w-full border border-gray-300"
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
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Reset Time</th>
                                <th className="px-4 py-2">isWeekly?</th>
                                <th className="px-4 py-2 no-export">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        {resetTimes.map((r) => {
                            return (
                                <tr key={r.id}>
                                    <td className="px-4 py-2">{r.id}</td>
                                    <td className="px-4 py-2">{r.game_type}</td>
                                    <td className="px-4 py-2">{r.reset_time}</td>
                                    <td className="px-4 py-2">{r.isWeekly}</td>

                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={(e) => updsubmit(e, r.id)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => delsubmit(e, r, r.id)}
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
            
        </AdminLayout>
    )
}