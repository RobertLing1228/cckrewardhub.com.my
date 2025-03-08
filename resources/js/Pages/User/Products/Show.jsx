import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function Show({ product }) {
    return (
        <MainLayout>
            <Head title={product.name} />
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {/* Back Button */}
                    <Link
                        href="/products"
                        className="inline-block mb-4 text-blue-500 hover:text-blue-700"
                    >
                        &larr; Back to Products
                    </Link>

                    {/* Product Image */}
                    <MultipleImages images={product.image} name={product.name} />

                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                    {/* Product Price */}
                    <p className="text-2xl font-semibold text-gray-900 mb-4">RM{product.price}</p>

                    {/* Product Description */}
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    {/* Product Category */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-600">
                            Category: <span className="text-gray-800">{product.category_name}</span>
                        </p>
                    </div>

                    {/* Product Quantity 
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-600">
                            Quantity: <span className="text-gray-800">{product.quantity}</span>
                        </p>
                    </div>
                    */}
                </div>
            </div>
        </MainLayout>
    );
}