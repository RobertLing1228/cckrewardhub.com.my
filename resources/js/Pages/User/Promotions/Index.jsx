import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';


export default function PromotionIndex ({ promotion }) {
    return (
        <MainLayout>
            <Head title="Promotions" />
        <div className="min-h-screen bg-gray-100 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Promotion</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotion.map((promotion) => (
                        <div
                            key={promotion.promotionID}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{promotion.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">{promotion.description}</p>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Start Date: <span className="text-gray-800">{promotion.start_date}</span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        End Date: <span className="text-gray-800">{promotion.end_date}</span>
                                    </p>
                                </div>
                                <Link
                                    href={`/promotions/${promotion.promotionID}`} 
                                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
