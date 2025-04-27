import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function EditBranch ({branch}) {
    const {data, setData, post, errors, processing} = useForm({
            name: branch.name
        })
    
    function submit(e) {
        e.preventDefault();
    
        post(`/admin/branches/${branch.id}`, data);
    }

    return (
        <AdminLayout title="Edit Branch"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Branches", url: "/admin/branches" },
                { label: "Add Branch" }
            ]}>
            <Head title="Add Branch" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Name</label>
                    {errors.name && <div className="error">{errors.name}</div>}
                    <input 
                        type="text" 
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <p>Changes:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{branch.name}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.name}</td>
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