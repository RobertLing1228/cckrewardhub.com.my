import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function UserVouchers(vouchers) {
    return (
        <AdminLayout
            title="User Vouchers List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "User Vouchers" }
            ]}
        >
            <Head title="User Vouchers List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">User Vouchers</h2>
                <div className="overflow-x-auto">
                    <DataTable id="uservouchersTable" className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">Voucher ID</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Claim Date</th>
                                <th className="px-4 py-2">Used Date</th>
                            </tr>

                            <tbody>
                                {vouchers.map((voucher) => (
                                    <tr key={voucher.id}>
                                        <td className="px-4 py-2">{voucher.id}</td>
                                        <td className="px-4 py-2">{voucher.userID}</td>
                                        <td className="px-4 py-2">{voucher.voucher_ID}</td>
                                        <td className="px-4 py-2">{voucher.status}</td>
                                        <td className="px-4 py-2">{voucher.claim_at}</td>
                                        <td className="px-4 py-2">{voucher.used_at}</td>
                                    </tr>
                                ))}
                        
                            </tbody>

                        </thead>
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
}
                               