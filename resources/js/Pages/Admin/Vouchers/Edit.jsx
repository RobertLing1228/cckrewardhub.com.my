import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";

export default function Edit ({voucher}) {

    const {data, setData, post, errors, processing} = useForm({
        name: voucher.name,
        code: voucher.code,
        end_date: voucher.end_date,
        status: voucher.status,
        discount_type: voucher.discount_type,
        discount_value: voucher.discount_value,
    })

    function submit(e) {
        e.preventDefault();


        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("code", data.code);
        formData.append("end_date", data.end_date);  // Append file
        formData.append("status", data.status);
        formData.append("discount_type", data.discount_type);
        formData.append("discount_value", data.discount_value);

        post(`/admin/vouchers/${voucher.id}`, formData,
            {
                forceFormData: true,
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
                    maxLength={8}
                    value={data.code}
                    onChange={(e) => {
                        const val = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
                        setData("code", val);
                    }}
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
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button 
                                type="button"
                                className={`w-full px-4 py-2 text-left border rounded-md ${
                                    errors.discount_type ? "ring-red-500 border-red-500" : "border-gray-300"
                                }`}
                            >
                                {data.discount_type || "Select Discount Type"}
                                <span className="ml-2">▼</span>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <button 
                                type="button"
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => setData("discount_type", "percentage")}
                            >
                                percentage
                            </button>
                            <button 
                                type="button"
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                onClick={() => setData("discount_type", "fixed")}
                            >
                                fixed
                            </button>
                        </Dropdown.Content>
                    </Dropdown>

                    <label>Discount Value</label>
                    {errors.discount_value && <div className="error">{errors.discount_value}</div>}
                    <input 
                    type="number" 
                    placeholder="0.00"
                    value={data.discount_value}
                    onChange={(e) => setData("discount_value", e.target.value)}
                    onBlur={(e) => setData("discount_value", parseFloat(e.target.value).toFixed(2))}
                    className={errors.discount_value && "!ring-red-500"}
                    />

                

                    <p>Changes:</p>
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
                                <td>{voucher.name}</td>
                                <td>{voucher.code}</td>
                                <td>{voucher.end_date}</td>
                                <td>{voucher.status}</td>
                                <td>{voucher.discount_type}</td>
                                <td>{voucher.discount_value}</td>

                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.code}</td>
                                <td>{data.end_date}</td>
                                <td>{data.status}</td>
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