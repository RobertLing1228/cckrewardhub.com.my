import React from "react";
import { Head } from "@inertiajs/react";
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

export default function UserVouchers({vouchers, flash}) {
    return (
        <AdminLayout
            title="User Vouchers List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "User Vouchers" }
            ]}
        >
            <Head title="User Vouchers List" />
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
                <h2 className="text-xl font-semibold mb-4">User Vouchers</h2>
                <div className="overflow-x-auto">
                    <DataTable id="uservouchersTable" className="min-w-full border border-gray-300"
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
                                <th className="px-4 py-2">Voucher ID</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Claim Date</th>
                                <th className="px-4 py-2">Used Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vouchers.map((voucher) => (
                                <tr key={voucher.id}>
                                    <td className="px-4 py-2">{voucher.id}</td>
                                    <td className="px-4 py-2">{voucher.userID}</td>
                                    <td className="px-4 py-2">{voucher.voucher_ID}</td>
                                    <td className="px-4 py-2">{voucher.status}</td>
                                    <td className="px-4 py-2">{voucher.claimed_at}</td>
                                    <td className="px-4 py-2">{voucher.used_at ? voucher.used_at : "N/A"}</td>
                                </tr>
                            ))}
                    
                        </tbody>

                        
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
}
                               