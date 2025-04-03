import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Search({ results = [], query = '' }) {
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
            <div className="container mx-auto px-4 py-8">
                
                {/* 返回按钮 */}
                <Link href="/recipes" className="text-blue-500 hover:text-blue-700">
                    &larr; Back to Recipes
                </Link>

                {/* 搜索框 */}
                <form onSubmit={handleSearch} className="mb-6">
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="Search for products or recipes..." 
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Search
                    </button>
                </form>

                {/* 分类筛选按钮 */}
                <div className="mt-6 flex gap-4">
                    <button 
                        onClick={() => setFilter('all')} 
                        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('recipes')} 
                        className={`px-4 py-2 rounded ${filter === 'recipes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Recipes
                    </button>
                    <button 
                        onClick={() => setFilter('products')} 
                        className={`px-4 py-2 rounded ${filter === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Products
                    </button>
                </div>

                {/* 搜索结果展示 */}
                <div className="mt-6">
                    {filteredResults.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredResults.map((item) => (
                                    <div key={item.id} className="border rounded-lg shadow-lg p-4">
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                                        <p className="mt-2">{item.description?.slice(0, 100)}...</p>
                                        <Link 
                                            href={`/${item.type}/${item.id}`} 
                                            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
