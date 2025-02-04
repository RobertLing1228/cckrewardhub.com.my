import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Recipes ({ recipes }) {
    return (
        <AdminLayout
            title="Recipes List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Recipes" }
            ]}
        >
            <Head title="Recipes List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">ProductID</th>
                    <th className="px-4 py-2 border">Category</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                    <tr key={recipe.recipeID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{recipe.recipeID}</td>
                        <td className="px-4 py-2 border">{recipe.productID}</td>
                        <td className="px-4 py-2 border">{recipe.category}</td>
                        <td className="px-4 py-2 border">{recipe.title}</td>
                        <td className="px-4 py-2 border truncate max-w-[150px]">
                        {recipe.description}
                        </td>
                        <td className="px-4 py-2 border">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
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
}