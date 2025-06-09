import React from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';
import MultipleImages from "@/Components/MultipleImages";
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.print.mjs';
import "datatables.net-buttons/js/buttons.html5.mjs";
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';

window.JSZip = jszip;
window.pdfMake = pdfMake;
DataTable.use(DT);

export default function Products ({ products, flash }) {
    const { delete: destroy } = useForm();
    
        function updsubmit(e, product){
            e.preventDefault();
    
            router.visit(route('products.edit', product));
        }
    
        function delsubmit(e, product) {
            e.preventDefault();
        
            Swal.fire({
                title: 'Delete "' + product.name + '" ?',
                text: "This will remove the product from the list.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    destroy(route("products.delete", product));
                    Swal.fire("Deleted!", "The product has been removed.", "success");
                }
            });
        }

    return (
        <AdminLayout
            title="Products List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Products" }
            ]}
        >   
            <Head title="Products List" />
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
            <Link href="/admin/products/add" className="bg-blue-500 text-white px-3 py-1 rounded">Create Product </Link>
            </div>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300"
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
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Hot Item</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product.productID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{product.productID}</td>
                        <td className="px-4 py-2 border">{product.name}</td>
                        <td className="px-4 py-2 border">${product.price}</td>
                        <td className="px-4 py-2 border truncate max-w-[150px]">
                        {product.description}
                        </td>
                        <td className="px-4 py-2 border">{product.category}</td>
                        <td className="px-4 py-2 border">
                        <MultipleImages images={product.image} name={product.name}/>
                        </td>
                        <td className="px-4 py-2 border">{product.itemHot ? "Yes" : "No"}</td>
                        <td className="px-4 py-2 border">
                        <button onClick={(e) => updsubmit(e, product)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
                        <button onClick={(e) => delsubmit(e, product)} className="bg-red-500 text-white px-3 py-1 rounded">
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