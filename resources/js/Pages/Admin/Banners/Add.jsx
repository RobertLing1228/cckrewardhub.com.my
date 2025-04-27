import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AddBanner () {
    const {data, setData, post, errors, processing} = useForm({
            image_path: '',
            link: ''
        })
    
    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image_path", data.image_path);
        formData.append("link", data.link);
    
        post('/admin/banners/add', formData);
    }

    return (
        <AdminLayout title="Add Banners"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Banners", url: "/admin/banners" },
                { label: "Add Banner" }
            ]}>
            <Head title="Add Banner" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Image</label>
                    {errors.image_path && <div className="error">{errors.image_path}</div>}
                    <input 
                        type="file"
                        onChange={(e) => setData("image_path", e.target.files[0])}
                        className={errors.image_path && "!ring-red-500"}
                    />

                    <label>Link</label>
                    {errors.link && <div className="error">{errors.link}</div>}
                    <input 
                        type="text"
                        value={data.link}
                        onChange={(e) => setData("link", e.target.value)}
                        className={errors.link && "!ring-red-500"}
                    />

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Link</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>

                                <td>{data.link}</td>
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