import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function Show({ promotion, product }) {
    return (
        <MainLayout>
            <Head title={promotion.title} />
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {/* Back Button */}
                    <Link
                        href="/promotions"
                        className="inline-block mb-4 text-blue-500 hover:text-blue-700"
                    >
                        &larr; Back to Promotions
                    </Link>

                    {/* Product Image (Clickable) */}
                    {product && (
                        <Link href={`/products/${product.productID}`}>
                            <MultipleImages images={product.image} name={product.name} />
                        </Link>
                    )}

                    {/* Promotion Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{promotion.title}</h1>

                    {/* Promotion Description */}
                    <p className="text-gray-600 mb-6">{promotion.description}</p>

                    {/* Promotion Dates */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-600">
                            Start Date: <span className="text-gray-800">{promotion.start_date}</span>
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                            End Date: <span className="text-gray-800">{promotion.end_date}</span>
                        </p>
                    </div>

                    {/* Promotion Code */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-600">
                            Promotion Code: <span className="text-gray-800 font-bold">{promotion.code}</span>
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}