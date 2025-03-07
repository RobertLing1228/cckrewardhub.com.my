import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function RecipeIndex ({ recipe }){
    return (
        <MainLayout>
            <Head title="Recipes" />
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Recipe</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipe.map((recipe) => (
                    <div key={recipe.recipeID} className="border rounded-lg shadow-lg p-4">
                        <MultipleImages images={recipe.image} name={recipe.title} />
                        <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
                        <p className="text-sm text-gray-500">{recipe.category}</p>
                        <p className="mt-2">{recipe.description.slice(0, 100)}...</p>
                        <Link 
                            href={`/recipes/${recipe.recipeID}`} 
                            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            View Recipe
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </MainLayout>
    );
};

