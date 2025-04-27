import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Import({tableNames, flash}) {
    const { post, setData, data, errors, processing } = useForm({
        csv_file: null,
        table_name: ''
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.import'), {
          forceFormData: true,
        });
      };
    return (
        <AdminLayout
            title="Import CSV"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Imports" }
        ]}
        >
            <Head title="Imports" />
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
                <div className="mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Select Table</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.table_name}
                            onChange={(e) => setData("table_name", e.target.value)}
                        >
                            <option value="">-- Choose Table --</option>
                            {tableNames.map((table, index) => (
                                <option key={index} value={table}>
                                    {table}
                                </option>
                            ))}
                        </select>
                        {errors.table_name && <p className="text-red-500">{errors.table_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">CSV File</label>
                        <input
                        type="file"
                        accept=".csv"
                        className="w-full"
                        onChange={e => setData('csv_file', e.target.files[0])}
                        />
                        {errors.csv_file && <p className="text-red-500">{errors.csv_file}</p>}
                        <label>
                        <input type="checkbox" checked={data.has_header} onChange={e => setData('has_header', e.target.checked)} />
                        First row is header
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        Upload CSV
                    </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}