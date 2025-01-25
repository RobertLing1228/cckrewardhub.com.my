import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function RecipeIndex ({ recipe }){
    return (
        <MainLayout>
            <Head title="Recipes" />
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Recipe</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipe.map((recipe) => (
                    <div key={recipe.recipeID} className="border rounded-lg shadow-lg p-4">
                        <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
                        <p className="text-sm text-gray-500">{recipe.category}</p>
                        <p className="mt-2">{recipe.description.slice(0, 100)}...</p>
                        <Link 
                            href={`/recipe/${recipe.recipeID}`} 
                            className="inline-block mt-4 text-blue-500 hover:text-blue-700"
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

