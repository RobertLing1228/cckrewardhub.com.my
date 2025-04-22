import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Search({ results = [], query = '', prev }) {
    const [searchQuery, setSearchQuery] = useState(query);
    const [filter, setFilter] = useState('all'); // 默认显示所有
    const [filteredResults, setFilteredResults] = useState(results); // 存放筛选后的数据

    // 监听 filter 变化，并更新 `filteredResults`
    useEffect(() => {
        if (filter === 'all') {
            setFilteredResults(results);
        } else {
            setFilteredResults(results.filter(item => item.type === filter));
        }
    }, [filter, results]); // 依赖 `filter` 和 `results`，保证状态更新时触发

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search?query=${searchQuery}`;
    };

    return (
        <MainLayout>
            <Head title="Search" />
            <div className="container mx-auto px-4 py-10">
                
                {/* Back Button */}
                <div>
                    <Link href={prev} className="text-gray-700 hover:text-blue-600 text-sm font-medium transition">
                        &larr; Back
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="mt-6 flex justify-center">
                    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search for products or recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pr-10 text-sm text-gray-700 bg-white rounded shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            🔍
                        </button>
                    </form>
                </div>




                {/* Filter Buttons */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button 
                        onClick={() => setFilter('all')} 
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('recipes')} 
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'recipes' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
                    >
                        Recipes
                    </button>
                    <button 
                        onClick={() => setFilter('products')} 
                        className={`px-5 py-2 rounded-full text-sm font-medium transition ${filter === 'products' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
                    >
                        Products
                    </button>
                </div>

                {/* Results */}
                <div className="mt-6">
                    {filteredResults.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Search Results:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredResults.map((item) => (
                                    <div key={item.id} className="border rounded-lg shadow-lg p-4 bg-white">
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                                        <p className="mt-2">{item.description?.slice(0, 100)}...</p>
                                        <Link 
                                            href={`/${item.type}/${item.id}`} 
                                            className="inline-block mt-4 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">No results found.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
