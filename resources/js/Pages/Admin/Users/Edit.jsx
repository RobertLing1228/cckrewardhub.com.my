import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit ({member}) {
    const {data, setData, post, errors, processing} = useForm({
            memberID: member.memberID,
            phoneNumber: member.phoneNumber,
        })
    
    function submit(e) {
        e.preventDefault();
    
        post(`/admin/users/${member.id}`, data);
    }

    return (
        <AdminLayout title="Add Users"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Users", url: "/admin/users" },
                { label: "Add User" }
            ]}>
            <Head title="Add User" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Member ID</label>
                    {errors.memberID && <div className="error">{errors.memberID}</div>}
                    <input 
                        type="text"
                        value={data.memberID}
                        onChange={(e) => setData("memberID", e.target.value)}
                        className={errors.memberID && "!ring-red-500"}
                    />

                    <label>Phone Number</label>
                    {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                    <input 
                        type="text"
                        value={data.phoneNumber}
                        onChange={(e) => setData("phoneNumber", e.target.value)}
                        className={errors.phoneNumber && "!ring-red-500"}
                    />

                    <p>Changes:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">MemberID</th>
                                <th className="font-bold">PhoneNumber</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{member.memberID}</td>
                                <td>{member.phoneNumber}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>

                                <td>{data.memberID}</td>
                                <td>{data.phoneNumber}</td>
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