import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit ({promotion}) {

    const {data, setData, post, errors, processing} = useForm({
        productid: promotion.productID,
        title: promotion.title,
        description: promotion.description,
        startdate: promotion.startdate,
        enddate: promotion.enddate,
        code: promotion.code,
    })

    function submit(e) {
        e.preventDefault();

        post(`/admin/promotions/${promotion.promotionID}`)
    }

    console.log(errors);

    return (
        <AdminLayout
            title="Edit Promotion"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Products", url: "/admin/promotions" },
                { label: "Edit Promotion" }
            ]}
        >   
            <Head title="Edit Promotion" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>

                    <label>Product ID</label>
                    {errors.productid && <div className="error">{errors.productid}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={data.productid}
                        onChange={(e) => setData("productid", e.target.value)}
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
                        value={data.startdate} 
                        onChange={(e) => setData("startdate", e.target.value)}
                        className="border px-2 py-1 rounded"
                    />

                    <label>End Date</label>
                    <input 
                        type="date" 
                        value={data.enddate} 
                        onChange={(e) => setData("enddate", e.target.value)}
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
                    




                    <h2 className="font-bold mt-4">Changes:</h2>
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
                                <td>{product.productid}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.startdate}</td>
                                <td>{product.enddate}</td>
                                <td>{dproduct.code}</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td>{data.productid}</td>
                                <td>{data.title}</td>
                                <td>{data.description}</td>
                                <td>{data.startdate}</td>
                                <td>{data.enddate}</td>
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