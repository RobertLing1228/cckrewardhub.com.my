import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Products ({ products }) {

    return (
        <AdminLayout
            title="Products List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Products" }
            ]}
        >   
            <Head title="Products List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Actions</th>
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
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                        />
                        </td>
                        <td className="px-4 py-2 border">
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded">
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