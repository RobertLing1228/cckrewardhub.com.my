import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Add () {

    const {data, setData, post, errors, processing} = useForm({
        name: '',
        code: '',
        date_issued: null,
        end_date: null,
        discount_type: '',
        discount_value: '',
    })

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("code", data.code);
        formData.append("date_issued", new Date().toISOString().split('T')[0]);
        formData.append("end_date", data.end_date);  // Append file
        formData.append("discount_type", data.discount_type);
        formData.append("discount_value", data.discount_value);

        post('/admin/vouchers/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    console.log(errors);


    return (
        <AdminLayout
            name="Add Voucher"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Vouchers", url: "/admin/vouchers" },
                { label: "Add Voucher" }
            ]}
        >   
            <Head title="Add Voucher" />
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

                    <label>Code</label>
                    {errors.code && <div className="error">{errors.code}</div>}
                    <input
                    value={data.code}
                    onChange={(e) => setData("code", e.target.value)}
                    className={errors.code && "!ring-red-500"}
                    ></input>

                    <label>End Date</label>
                    {errors.end_date && <div className="error">{errors.end_date}</div>}
                    <input 
                    type="date" 
                    value={data.end_date}
                    onChange={(e) => setData("end_date", e.target.value)}
                    className={errors.end_date && "!ring-red-500"}
                    />

                    <label>Discount Type</label>
                    {errors.discount_type && <div className="error">{errors.discount_type}</div>}
                    <input 
                    type="text" 
                    value={data.discount_type}
                    onChange={(e) => setData("discount_type", e.target.value)}
                    className={errors.discount_type && "!ring-red-500"}
                    />

                    <label>Discount Value</label>
                    {errors.discount_value && <div className="error">{errors.discount_value}</div>}
                    <input 
                    type="text" 
                    value={data.discount_value}
                    onChange={(e) => setData("discount_value", e.target.value)}
                    className={errors.discount_value && "!ring-red-500"}
                    />

                

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Name</th>
                                <th className="font-bold">Code</th>
                                <th className="font-bold">End Date</th>
                                <th className="font-bold">Status</th>
                                <th className="font-bold">Discount Type</th>
                                <th className="font-bold">Discount Value</th>

                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.code}</td>
                                <td>{data.end_date}</td>
                                <td>Active</td>
                                <td>{data.discount_type}</td>
                                <td>{data.discount_value}</td>

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