import React, { useState } from "react";
import { Head, router, useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.print.mjs';
import "datatables.net-buttons/js/buttons.html5.mjs";
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';

window.JSZip = jszip;
window.pdfMake = pdfMake;
DataTable.use(DT);

export default function Users ({ admins, members, flash, users }) {
    const { delete: destroy } = useForm();
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

    function updsubmit(e, u){
        e.preventDefault();
        router.visit(route("users.edit", u));
    }
    
    function delsubmit(e, u, name){
        e.preventDefault();
        Swal.fire({
            title: `Delete "${name}" ?`,
            text: "This will remove the use from the table!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("users.delete", u),{
                    onSuccess: () => {
                        Swal.fire("Deleted!", "The use has been removed.", "success");
                    },
                    onError: () => {
                        Swal.fire("Failed!", "Something went wrong. User not deleted.", "error");
                    }
                });
            }
        });
    }

    function updmemsubmit(e, m){
        e.preventDefault();
        router.visit(route("members.edit", m));
    }

    function delmemsubmit(e, m, n){
        e.preventDefault();
        Swal.fire({
            title: `Delete "${n}" ?`,
            text: "This will remove the use from the table!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("members.delete", m),{
                    onSuccess: () => {
                        Swal.fire("Deleted!", "The user has been removed.", "success");
                    },
                    onError: () => {
                        Swal.fire("Failed!", "Something went wrong. User not deleted.", "error");
                    }
                });
            }
        });
    }


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
            {flash?.error && (
                <div className="mb-4 p-4 rounded bg-red-200 text-red-800 border border-red-300">
                    ❌ {flash.error}
                </div>
            )}
            <div className="p-4 bg-white shadow-md rounded-lg">

            <h2 className="text-xl font-semibold mb-4">Logged Users</h2>
            <div className="flex justify-between mb-4">
            <Link href="/admin/users/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add User </Link>  
            </div>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300"
                options={{
                    dom: 'Bfrtip',
                    buttons: [
                        {
                          extend: 'copy',
                          exportOptions: {
                            columns: ':not(.no-export)' // 👈 magic here
                          }
                        },
                        {
                          extend: 'csv',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }},
                        {
                          extend: 'excel',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'pdf',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'print',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        }
                      ]
                }}>
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">MemberID</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                    <tr key={u.userID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{u.userID}</td>
                        <td className="px-4 py-2 border">{u.memberID}</td>
                        <td className="px-4 py-2 border">{u.phoneNumber}</td>
                        <td className="px-4 py-2 border">
                        <button onClick={(e) => updsubmit(e, u.userID)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
                        <button onClick={(e) => delsubmit(e, u.userID, u.memberID)} className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                        </td>
                        
                    </tr>
                    
                    ))}
                    
                </tbody>
                </DataTable>
                
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-10">Existing Members Pool</h2>
            <div className="flex justify-between mb-4">
            <Link href="/admin/members/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add User </Link>  
            </div>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300"
                options={{
                    dom: 'Bfrtip',
                    buttons: [
                        {
                          extend: 'copy',
                          exportOptions: {
                            columns: ':not(.no-export)' // 👈 magic here
                          }
                        },
                        {
                          extend: 'csv',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }},
                        {
                          extend: 'excel',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'pdf',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'print',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        }
                      ]
                }}>
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">MemberID</th>
                    <th className="px-4 py-2 border">Phone Number</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                    <tr key={member.existsmemID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{member.existsmemID}</td>
                        <td className="px-4 py-2 border">{member.memberID}</td>
                        <td className="px-4 py-2 border">{member.phoneNumber}</td>
                        <td className="px-4 py-2 border">
                        <button onClick={(e) => updmemsubmit(e, member.existsmemID)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                            Edit
                        </button>
                        <button onClick={(e) => delmemsubmit(e, member.existsmemID, member.memberID)} className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                        </td>
                        
                    </tr>
                    
                    ))}
                    
                </tbody>
                </DataTable>
                
            </div>

            <h2 className="text-xl font-semibold mb-4">Admins</h2>
            <div className="overflow-x-auto">
                <DataTable id="productsTable" className="min-w-full border border-gray-300"
                options={{
                    dom: 'Bfrtip',
                    buttons: [
                        {
                          extend: 'copy',
                          exportOptions: {
                            columns: ':not(.no-export)' // 👈 magic here
                          }
                        },
                        {
                          extend: 'csv',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }},
                        {
                          extend: 'excel',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'pdf',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        },
                        {
                          extend: 'print',
                          exportOptions: {
                            columns: ':not(.no-export)'
                          }
                        }
                      ]
                }}>
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Password</th>
                    <th className="px-4 py-2 border no-export">Actions</th>
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