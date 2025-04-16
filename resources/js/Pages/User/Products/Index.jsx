import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function ProductIndex({ products, filters, categories, branches }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        branch_id: filters.branch_id || '',
    });

    const [selectedBranch, setSelectedBranch] = useState(filters.branch_id || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        get('/products', { preserveState: true });
    };

    const resetFilters = () => {
        setData({ search: '', category: '', branch_id: '' }); // Reset filters
        setSelectedBranch('');
        setSelectedCategory('');
        get('/products', { preserveState: false, replace: true });
        window.location.href = "/products"; // Reload the page
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

    return (
        <MainLayout>
            <Head title="Products" />
            <div className="min-h-screen bg-gray-100 py-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 px-4">Products</h1>

                {/* Branch Selection Dropdown */}
                <div className="mb-4 px-4">
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                        Select Branch
                    </label>
                    <select
                        id="branch"
                        name="branch_id"
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">All Branches</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search & Filters */}
                <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                Search by Name
                            </label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                value={data.search || ''}
                                onChange={(e) => setData('search', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Filter by Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((item) => (
                                    <option key={item.categoryID} value={item.categoryID.toString()}>
                                        {item.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-2">
                            <button type="submit" className="flex-1 py-2 px-4 bg-blue-500 text-white rounded">
                                Apply Filters
                            </button>
                            <button type="button" onClick={resetFilters} className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </form>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.productID} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <MultipleImages images={product.image} name={product.name} />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <p className="text-lg font-bold mt-2">RM{product.price}</p>
                                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                    <Link href={`/products/${product.productID}`} className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No products available for this branch.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

