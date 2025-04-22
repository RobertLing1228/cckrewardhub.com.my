import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Users ({ admins, members, flash }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        current_pass: "",
        new_pass: "",
        new_pass_confirmation: ""
    });

    const handleResetClick = (admin) => {
        setSelectedAdmin(admin);
        setForm({
            current_pass: "",
            new_pass: "",
            new_pass_confirmation: ""
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route('admin.reset-password', selectedAdmin.adminID), form, {
            onSuccess: () => {
                setShowModal(false);
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    return (
        
        <AdminLayout
            title="Users List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Users" }
            ]}
        >
            <Head title="Users List" />
            {flash?.success && (
                <div className="mb-4 p-4 rounded bg-green-200 text-green-800 border border-green-300">
                    ✅ {flash.success}
                </div>
            )}
            <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Existing Members</h2>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">MemberID</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                    <tr key={member.existsmemID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{member.existsmemID}</td>
                        <td className="px-4 py-2 border">{member.memberID}</td>
                        <td className="px-4 py-2 border">{member.phoneNumber}</td>
                        <td className="px-4 py-2 border">
                        <button
                            className="bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                            View Options
                        </button>
                        </td>
                        
                    </tr>
                    
                    ))}
                    
                </tbody>
                </DataTable>
                
            </div>

            <h2 className="text-xl font-semibold mb-4">Admins</h2>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Password</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                    <tr key={admin.adminID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{admin.adminID}</td>
                        <td className="px-4 py-2 border">{admin.name}</td>
                        <td className="px-4 py-2 border">*********</td>
                        <td className="px-4 py-2 border">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleResetClick(admin)}>
                            Reset Password
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

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Reset Password for {selectedAdmin.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="current_pass"
                                    value={form.current_pass}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            {errors.current_pass && (
                                <p className="text-red-500 text-sm mt-1">{errors.current_pass}</p>
                            )}
                            <div className="mb-4">
                                <label className="block font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="new_pass"
                                    value={form.new_pass}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="new_pass_confirmation"
                                    value={form.new_pass_confirmation}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            {errors.new_pass && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_pass}</p>
                            )}
                            {errors.new_pass_confirmation && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_pass_confirmation}</p>
                            )}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        
        
        
        </AdminLayout>
    );
}