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
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                        {recipe.title}
                    </h1>

                    {/* Recipe category */}
                    <div className="mb-4 flex items-center">
                        <span className="text-xs font-light text-gray-500 tracking-wider uppercase">
                            {recipe.category}
                        </span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-xs text-gray-400">Recipe</span>
                    </div>

                    {/* Recipe Description */}
                    <p className="text-gray-600 mb-6 whitespace-pre-line">{recipe.description}</p>

                </div>
            </div>
        </MainLayout>
    );
}