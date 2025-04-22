import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';
import { QRCodeSVG } from 'qrcode.react';

export default function Show({ product }) {
    return (
        <MainLayout>
            <Head title={product.name} />
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">

                    {/* Back Link */}
                    <Link
                        href="/products"
                        className="inline-block text-blue-500 hover:text-blue-600 font-medium mb-6 transition"
                    >
                        ← Back to Products
                    </Link>

                    {/* Image Gallery */}
                    <div className="mb-8">
                        <MultipleImages images={product.image} name={product.name} />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <p className="text-2xl text-blue-500 font-semibold">RM{product.price}</p>
                        <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>

                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">Category: </span>
                            <span className="text-gray-800">{product.category_name}</span>
                        </div>

                        {/* QR Code */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                            <p className="text-sm text-gray-600 font-semibold">Scan to view this product:</p>
                            <QRCodeSVG
                                value={`${window.location.origin}/products/${product.productID}`}
                                size={100}
                                className="mt-2 sm:mt-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
