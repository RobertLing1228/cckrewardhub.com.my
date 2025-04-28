import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function EditCategory ({category}) {
    const {data, setData, post, errors, processing} = useForm({
            categoryName: category.categoryName
        })
    
    function submit(e) {
        e.preventDefault();
    
        post(`/admin/categories/${category.categoryID}`, data);
    }

    return (
        <AdminLayout title="Edit Category"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Categories", url: "/admin/categories" },
                { label: "Edit Category" }
            ]}>
            <Head title="Edit Category" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Category Name</label>
                    {errors.categoryName && <div className="error">{errors.categoryName}</div>}
                    <input 
                        type="text" 
                        value={data.categoryName}
                        onChange={(e) => setData("categoryName", e.target.value)}
                        className={errors.categoryName && "!ring-red-500"}
                    />

                    <p>Changes:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Category Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{category.categoryName}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.categoryName}</td>
                            </tr>
                        </tbody>
                        
                        
                    </table>

                    <button className="primary-btn mt-4" disabled={processing}>Submit</button>
                </form>
                
            </div>
            </div>
        </AdminLayout>
    );
}