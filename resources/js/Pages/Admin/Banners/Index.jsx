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

export default function Index({banners, flash}) {
    const { delete: destroy } = useForm();
    
    function updsubmit(e, banner){
        e.preventDefault();

        router.visit(route('banners.edit', banner));
    }

    function delsubmit(e, banner, bannerid){
        e.preventDefault();
        
        Swal.fire({
            title: 'Delete "' + bannerid + '" ?',
            text: "This will remove the banner from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("branches.delete", banner));
                Swal.fire("Deleted!", "The banner has been removed.", "success");
            }
        });
    }

    return (
        <AdminLayout 
            title="Banner"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Branches" }
            ]}
        > 

        <Head title="Banner"/>
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
        <Link href="/admin/banners/add" className="bg-green-500 text-white px-3 py-1 rounded">
                Add Banner
            </Link>
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
                <DataTable id="bannersTable" className="min-w-full border border-gray-300"
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
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Image Path</th>
                    <th className="px-4 py-2 border">Link</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{b.id}</td>
                        <td className="px-4 py-2 border">
                            <img
                                src={b.image_path ? `${window.location.origin}/storage/${b.image_path}` : 'https://via.placeholder.com/150'} 
                                alt={'Banner ' + b.id}
                                className="w-12 h-12 object-cover rounded"
                            />
                            
                        </td>
                        <td className="px-4 py-2 border">{b.image_path}</td>
                        <td className="px-4 py-2 border">{b.link}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updsubmit(e, b.id)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delsubmit(e, b.id, b.id)}  className="bg-red-500 text-white px-3 py-1 rounded">
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