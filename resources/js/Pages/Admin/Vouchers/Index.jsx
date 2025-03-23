import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Vouchers({vouchers}) {
    return (
        <AdminLayout
        title="Vouchers List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Vouchers" }
        ]}
        >
            <Head title="Vouchers" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <Link href="/admin/vouchers/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add Vouchers</Link>

                <DataTable id="vouchersTable" className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Voucher Name</th>
                            <th className="px-4 py-2">Voucher Code</th>
                            <th className="px-4 py-2">Date Issued</th>                            
                            <th className="px-4 py-2">End Date</th>                            
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.id}>
                                <td className="px-4 py-2">{voucher.id}</td>
                                <td className="px-4 py-2">{voucher.name}</td>
                                <td className="px-4 py-2">**********</td>
                                <td className="px-4 py-2">{voucher.date_issued}</td>
                                <td className="px-4 py-2">{voucher.end_date}</td>
                                <td className="px-4 py-2">{voucher.status}</td>

                            </tr>
                        ))}
                    </tbody>

                </DataTable>
            </div>

        </AdminLayout>
    );
};