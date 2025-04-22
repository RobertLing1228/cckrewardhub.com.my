import React from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create () {

    const {data, setData, post, errors, processing} = useForm({
        productID: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        code: '',
    })

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productID", data.productID);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);
        formData.append("code", data.code);

        post('/admin/promotions/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    console.log(errors);

    return (
        <AdminLayout
            title="Add Promotion"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Products", url: "/admin/promotions" },
                { label: "Add Promotion" }
            ]}
        >   
            <Head title="Add Promotion" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>

                    <label>Product ID</label>
                    {errors.productID && <div className="error">{errors.productID}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={data.productID}
                        onChange={(e) => setData("productID", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />

                    <label>Title</label>
                    {errors.title && <div className="error">{errors.title}</div>}
                    <input 
                        type="text" 
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Start Date</label>
                    <input 
                        type="date" 
                        value={data.start_date} 
                        onChange={(e) => setData("start_date", e.target.value)}
                        className="border px-2 py-1 rounded"
                    />

                    <label>End Date</label>
                    <input 
                        type="date" 
                        value={data.end_date} 
                        onChange={(e) => setData("end_date", e.target.value)}
                        className="border px-2 py-1 rounded"
                    />

                    <label>Code</label>
                    {errors.code && <div className="error">{errors.code}</div>}
                    <input 
                        type="text" 
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />
                    




                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Product ID</th>
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Start Date</th>
                                <th className="font-bold">End Date</th>
                                <th className="font-bold">Code</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.productID}</td>
                                <td>{data.title}</td>
                                <td>{data.description}</td>
                                <td>{data.start_date}</td>
                                <td>{data.end_date}</td>
                                <td>{data.code}</td>

                            </tr>
                        </tbody>
                        
                        
                    </table>

                    <button className="primary-btn mt-4" disabled={processing}>Submit</button>
                </form>
                
            </div>
            </div>
        </AdminLayout>
    );
};