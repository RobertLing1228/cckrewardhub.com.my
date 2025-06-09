import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function Show({ recipe }) {
    return (
        <MainLayout>
            <Head title={recipe.title} />
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header section with image */}
                    <div className="p-6 sm:p-10">
                        {/* Back Button */}
                        <Link
                            href="/recipes"
                            className="text-sm text-blue-600 hover:underline inline-flex items-center mb-6"
                        >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Recipes
                        </Link>

                        {/* Recipe Image */}
                        <div className="rounded-lg overflow-hidden mb-6 shadow-sm">
                            <MultipleImages images={recipe.image} name={recipe.title} />
                        </div>

                        {/* Recipe Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                            {recipe.title}
                        </h1>

                        {/* Category Tag */}
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full capitalize">
                                {recipe.category}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-gray-400">Recipe</span>
                        </div>

                        <hr className="border-gray-200 my-6" />

                        {/* Description */}
                        <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                            {recipe.description}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
