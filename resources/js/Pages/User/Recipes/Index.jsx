import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function RecipeIndex({ recipe }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(recipe.map(r => r.category))];
  const filteredRecipes =
    selectedCategory === 'all' ? recipe : recipe.filter(r => r.category === selectedCategory);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <Head title="Recipes" />
      <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
            Delicious Recipes
          </h1>
          
          {/* Category Dropdown Filter */}
          <div className="w-full max-w-xs mx-auto mb-10">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-center">
              Select Recipe Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Recipes Grid */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.recipeID} href={`/recipes/${recipe.recipeID}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
                  <MultipleImages images={recipe.image} name={recipe.title} showNavigation={false} />
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{recipe.title}</h2>
                    <p className="text-xs text-blue-600 font-medium uppercase mb-2">{recipe.category}</p>
                    <p className="text-gray-600 flex-1">
                      {recipe.description.length > 100
                        ? recipe.description.slice(0, 100) + '...'
                        : recipe.description}
                    </p>
                    <div className="mt-4 text-blue-500 hover:underline text-sm text-center font-medium">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll to top */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              ↑
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

