import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function ProductIndex({ products, filters, categories, branches }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        branch_id: filters.branch_id || '',
    });
    
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [selectedBranch, setSelectedBranch] = useState(filters.branch_id || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        get('/products', { preserveState: true });
    };

    const resetFilters = () => {
        setData({ search: '', category: '', branch_id: '' });
        setSelectedBranch('');
        setSelectedCategory('');
        get('/products', { preserveState: false, replace: true });
        window.location.href = "/products";
    };

    const handleBranchChange = (e) => {
        const branchId = e.target.value;
        setSelectedBranch(branchId);
        setData('branch_id', branchId);
        get(`/products?branch_id=${branchId}&category=${selectedCategory}`, { preserveState: true });
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setData('category', categoryId);
        get(`/products?branch_id=${selectedBranch}&category=${categoryId}`, { preserveState: true });
    };

    const sortedCategories = [...categories].sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName)
    );

    const sortedBranches = [...branches].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    return (
        <MainLayout>
            <Head title="Products" />
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Browse Products</h1>

                {/* Filters */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg mb-10 max-w-4xl mx-auto space-y-6">
                    {/* Branch Filter */}
                    <div>
                        <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-1">
                            Branch
                        </label>
                        <select
                            id="branch"
                            name="branch_id"
                            value={selectedBranch}
                            onChange={handleBranchChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">All Branches</option>
                            {sortedBranches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                           <option value="">All Categories</option>
                           {sortedCategories.map((item) => (
                                <option key={item.categoryID} value={item.categoryID.toString()}>
                                    {item.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div>
                        <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-1">
                            Search Product
                        </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={data.search || ''}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Enter product name"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Apply Filters
                        </button>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.productID} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                                <Link
                                            href={`/products/${product.productID}`}
                                        >
                                <MultipleImages images={product.image} name={product.name} />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-blue-500 font-bold mt-2">RM{product.price}</p>
                                    
                                    <div className="mt-4 text-center text-blue-600 hover:underline">
                                        
                                            View Details
                                        
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products available for this branch.</p>
                    )}
                </div>

                {/* Scroll to top button */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                    >
                        Scroll to Top
                    </button>
                )}
            </div>
        </MainLayout>
    );
}


