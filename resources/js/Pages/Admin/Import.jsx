import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Import({ tableNames, tableColumns, flash }) {
    const { post, setData, data, errors, processing } = useForm({
        csv_file: null,
        table_name: '',
        has_header: 0
    });

    const [selectedTableColumns, setSelectedTableColumns] = useState([]);

    const isOptional = (column) => {
        return (column.key === 'PRI' && column.extra && column.extra.includes('auto_increment')) || column.nullable;
    };

    const handleTableChange = (e) => {
        const tableName = e.target.value;
        setData("table_name", tableName);
        setSelectedTableColumns(tableName ? tableColumns[tableName] || [] : []);
    };

    // Helper function to determine column style
    const getColumnStyle = (column) => {
        if (column.key === 'PRI') {
            const isAutoIncrement = column.extra && column.extra.includes('auto_increment');
            return isAutoIncrement 
                ? 'bg-orange-100 text-orange-800 border border-orange-200' // Auto-increment (optional)
                : 'bg-red-100 text-red-800 font-bold border border-red-200'; // Non-auto-increment PK (required)
        }
        if (column.nullable) {
            return 'bg-purple-100 text-purple-800 border border-purple-200'; // Nullable
        }
        return 'bg-blue-100 text-blue-800 border border-blue-200'; // Regular required column
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.import', data), {
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
                                onChange={handleTableChange}
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

                        {/* Table columns */}
                        {selectedTableColumns.length > 0 && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="font-medium mb-3 text-gray-700">CSV Structure Requirements</h3>
                                
                                {/* Column names row */}
                                <div className="mb-3">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTableColumns.map((column, index) => (
                                            <div key={`name-${index}`} className="flex flex-col items-center relative">
                                                <span className={`px-3 py-1.5 rounded-md text-sm ${getColumnStyle(column)}`}>
                                                    {column.name}
                                                    {isOptional(column) && (
                                                        <span className="absolute -top-1 -right-1 transform translate-x-1/2 -translate-y-1/2 bg-white text-xs text-gray-500 border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center">
                                                            ?
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Data types row */}
                                <div className="mb-3">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTableColumns.map((column, index) => (
                                            <div key={`type-${index}`} className="flex flex-col items-center">
                                                <span className={`px-3 py-1.5 rounded-md text-xs ${
                                                    isOptional(column)
                                                        ? 'bg-gray-50 text-gray-600 border border-gray-200'
                                                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                                                }`}>
                                                    {column.type}
                                                    {column.nullable && ' NULL'}
                                                    {column.key === 'PRI' && column.extra && column.extra.includes('auto_increment') && ' (auto)'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Legend */}
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 mr-1 bg-red-100 border border-red-200 rounded-sm"></span>
                                            <span>Primary Key (required)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 mr-1 bg-orange-100 border border-orange-200 rounded-sm"></span>
                                            <span>Auto-increment (optional)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 mr-1 bg-blue-100 border border-blue-200 rounded-sm"></span>
                                            <span>Required Column</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-3 h-3 mr-1 bg-purple-100 border border-purple-200 rounded-sm"></span>
                                            <span>Nullable Column</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Help text */}
                                <div className="mt-3 text-xs text-gray-500 space-y-1">
                                    <p>• <strong>Auto-increment columns</strong> (like ID) can be omitted - the database will generate them</p>
                                    <p>• <strong>Primary keys</strong> without auto-increment must be provided</p>
                                    <p>• Column order must match the table structure exactly</p>
                                    <p>• NULL values only accepted for nullable columns</p>
                                </div>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700">CSV File</label>
                            <input
                                type="file"
                                accept=".csv,.txt"  // Add both extensions explicitly
                                className="w-full border rounded p-2"  // Added border and padding
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        const file = e.target.files[0];
                                        // Additional client-side validation
                                        if (!['text/csv', 'text/plain', 'application/vnd.ms-excel'].includes(file.type) && 
                                            !file.name.match(/\.(csv|txt)$/i)) {
                                            alert('Please upload a CSV or text file');
                                            e.target.value = ''; // Clear the input
                                            return;
                                        }
                                        setData('csv_file', file);
                                    }
                                }}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Accepted formats: .csv, .txt (Max 5MB)
                            </p>
                            {errors.csv_file && <p className="text-red-500">{errors.csv_file}</p>}
                            

                            <label className="flex items-center mt-2">
                                <input 
                                    type="checkbox" 
                                    checked={data.has_header} 
                                    onChange={e => setData('has_header', e.target.checked)} 
                                    className="mr-2"
                                />
                                First row is header
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            disabled={processing}
                        >
                            {processing ? 'Uploading...' : 'Upload CSV'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}