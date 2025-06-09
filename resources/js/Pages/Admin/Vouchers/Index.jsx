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

export default function Vouchers({vouchers, flash}) {
    const { delete: destroy } = useForm();

    function updsubmit(e, v){
            e.preventDefault();
            router.visit(route("vouchers.edit", v));
        }

        function delsubmit(e, v, name){
            e.preventDefault();
            Swal.fire({
                title: `Delete "${name}" ?`,
                text: "This will remove the voucher from the table!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route("vouchers.delete", v),{
                        onSuccess: () => {
                            Swal.fire("Deleted!", "The voucher has been removed.", "success");
                        },
                        onError: () => {
                            Swal.fire("Failed!", "Something went wrong. voucher not deleted.", "error");
                        }
                    });
                }
            });
        }

    return (
        <AdminLayout
        title="Vouchers List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Vouchers" }
        ]}
        >
            <Head title="Vouchers" />
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
                <Link href="/admin/vouchers/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add Vouchers</Link>
                </div>

                <DataTable id="vouchersTable" className="min-w-full border border-gray-300"
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
                            <th className="px-4 py-2">Voucher Name</th>
                            <th className="px-4 py-2">Voucher Code</th>
                            <th className="px-4 py-2">Date Issued</th>                            
                            <th className="px-4 py-2">End Date</th>                            
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2 no-export">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id}>
                                <td className="px-4 py-2">{voucher.id}</td>
                                <td className="px-4 py-2">{voucher.name}</td>
                                <td className="px-4 py-2">{voucher.code}</td>
                                <td className="px-4 py-2">{voucher.date_issued}</td>
                                <td className="px-4 py-2">{voucher.end_date}</td>
                                <td className="px-4 py-2">{voucher.status}</td>
                                <td className="px-4 py-2">
                                    <button
                                    onClick={(e) => updsubmit(e, voucher.id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => delsubmit(e, voucher, voucher.name)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
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
};