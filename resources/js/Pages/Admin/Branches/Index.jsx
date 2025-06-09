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
 
export default function Branches ({ branches, branched_products, flash }) {
    const { delete: destroy } = useForm();

    function updbranchsubmit(e, branch){
        e.preventDefault();

        router.visit(route('branches.edit', branch));
    }

    function updbranchproductsubmit(e, branchproduct){
        e.preventDefault();

        router.visit(route('branchproduct.edit', branchproduct));
    }

    function delbranchsubmit(e, branch, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the branch from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("branches.delete", branch));
                Swal.fire("Deleted!", "The branch has been removed.", "success");
            }
        });
    }

    function delbranchproductsubmit(e, branchprod, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the branch from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("branchproduct.delete", branchprod));
                Swal.fire("Deleted!", "The branch has been removed.", "success");
            }
        });
    }

    return (
        <AdminLayout
            title="Branches"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Branches" }
            ]}
        >   
            <Head title="Branches List" />
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
            <div className="flex justify-between mb-4">
              <Link href="/admin/branches/add" className="bg-green-500 text-white px-3 py-1 rounded">
                  Add Branch
              </Link>
            </div>
            <div className="overflow-x-auto">
                <DataTable id="branchessTable" className="min-w-full border border-gray-300"
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
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{b.id}</td>
                        <td className="px-4 py-2 border">{b.name}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updbranchsubmit(e, b)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delbranchsubmit(e, b, b.name)}  className="bg-red-500 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                        
                        </td>
                    </tr>
                    ))}
                </tbody>
                </DataTable>

                <h2 className="text-xl font-semibold mb-4">Branch Products</h2>
                <div className="flex justify-between mb-4">
                  <Link href="/admin/branchproduct/add" className="bg-green-500 text-white px-3 py-1 rounded">Add Branch Product</Link>
                </div>
                
                <div className="overflow-x-auto">
                <DataTable id="branchProductsTable" className="min-w-full border border-gray-300"
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
                }}
                >
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Product ID</th>
                    <th className="px-4 py-2 border">Branch ID</th>
                    <th className="px-4 py-2 border">Stock</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {branched_products.map((bp) => (
                    <tr key={bp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{bp.id}</td>
                        <td className="px-4 py-2 border">{bp.productID}</td>
                        <td className="px-4 py-2 border">{bp.branch_id}</td>
                        <td className="px-4 py-2 border">{bp.stock}</td>
                        <td>
                            <button onClick={(e) => updbranchproductsubmit(e, bp.id)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={(e) => delbranchproductsubmit(e, bp.id, bp.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </td>
                        
                    </tr>
                    
                    ))}
                    
                </tbody>
                </DataTable>
                </div>
            </div>
            </div>
        </AdminLayout>
    );
};