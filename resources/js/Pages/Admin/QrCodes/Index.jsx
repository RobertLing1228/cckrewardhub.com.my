import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';
import { QRCodeSVG } from "qrcode.react";

DataTable.use(DT);

export default function QRCodes({qr_codes}) {
    const { delete: destroy } = useForm();
        
    function updsubmit(e, qr){
        e.preventDefault();

        router.visit(route('qrcodes.edit', qr));
    }

    function delsubmit(e, qr, name) {
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
                destroy(route("qrcodes.delete", qr), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "The QRCode has been removed.", "success");
                    },
                    onError: () => {
                        Swal.fire("Failed!", "Something went wrong. QRCode not deleted.", "error");
                    }
                });
            }
        });
    }

    return (
        <AdminLayout
            title="QR Code List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Qr Codes" }
            ]}
        >
            
            <Head title="Qr Codes" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <Link href="/admin/qrcodes/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Create QRCode </Link>
                <div className="overflow-x-auto">
                {qr_codes && qr_codes.length > 0 && (
                    <DataTable id="qrcodesTable" className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">ProductID</th>
                                <th className="px-4 py-2">Value</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {qr_codes.map((qr) => {
                            const svgId = `qr-svg-${qr.id}`;

                            const handleSaveQR = () => {
                                const svgElement = document.getElementById(svgId);
                                if (!svgElement) return;

                                const svgData = new XMLSerializer().serializeToString(svgElement);
                                const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
                                const url = URL.createObjectURL(svgBlob);

                                const img = new Image();
                                img.onload = () => {
                                    const canvas = document.createElement("canvas");
                                    canvas.width = img.width;
                                    canvas.height = img.height;
                                    const ctx = canvas.getContext("2d");
                                    ctx.drawImage(img, 0, 0);
                                    URL.revokeObjectURL(url);

                                    canvas.toBlob((blob) => {
                                        const link = document.createElement("a");
                                        link.href = URL.createObjectURL(blob);
                                        link.download = `QRCode_${qr.id}.png`;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }, "image/png");
                                };

                                img.src = url;
                            };

                            return (
                                <tr key={qr.id}>
                                    <td className="px-4 py-2">{qr.id}</td>
                                    <td className="px-4 py-2">{qr.qr_type}</td>
                                    <td className="px-4 py-2">{qr.product_id || "N/A"}</td>
                                    <td className="px-4 py-2">{qr.qr_value}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <QRCodeSVG
                                                id={svgId}
                                                value={`${window.location.origin}${qr.qr_value}`}
                                                size={128}
                                            />
                                            <button
                                                onClick={handleSaveQR}
                                                className="bg-green-600 text-white px-2 py-1 text-sm rounded"
                                            >
                                                Save QR
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={(e) => updsubmit(e, qr)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => delsubmit(e, qr, qr.id)}
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