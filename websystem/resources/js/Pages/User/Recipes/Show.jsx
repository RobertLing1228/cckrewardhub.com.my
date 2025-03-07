import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function Show({ recipe }) {
    return (
        <MainLayout>
            <Head title={recipe.name} />
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {/* Back Button */}
                    <Link
                        href="/recipes"
                        className="inline-block mb-4 text-blue-500 hover:text-blue-700"
                    >
                        &larr; Back to Recipes
                    </Link>

                    {/* Recipe Image */}
                    <MultipleImages images={recipe.image} name={recipe.title} />

                    {/* Recipe Name */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>

                    {/* Recipe Price */}
                    <p className="text-2xl font-semibold text-gray-900 mb-4">{recipe.category}</p>

                    {/* Recipe Description */}
                    <p className="text-gray-600 mb-6">{recipe.description}</p>

                </div>
            </div>
        </MainLayout>
    );
}