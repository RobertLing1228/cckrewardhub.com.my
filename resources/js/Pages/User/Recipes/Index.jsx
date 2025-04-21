import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function RecipeIndex({ recipe }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(recipe.map(r => r.category))];
  const filteredRecipes = selectedCategory === 'all' ? recipe : recipe.filter(r => r.category === selectedCategory);

  return (
    <MainLayout>
      <Head title="Recipes" />
      <div className="bg-[#f4f4f4] py-10 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Delicious Recipes</h1>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center mb-10 gap-4">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-100'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Recipe Cards */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.recipeID}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <MultipleImages images={recipe.image} name={recipe.title} />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
                  <p className="text-sm text-gray-500 italic mb-2">{recipe.category}</p>
                  <p className="text-gray-600 mb-4">
                    {recipe.description.length > 100
                      ? recipe.description.slice(0, 100) + '...'
                      : recipe.description}
                  </p>
                  <Link
                    href={`/recipes/${recipe.recipeID}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


