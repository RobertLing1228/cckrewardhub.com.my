import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function ProductIndex({ products, filters, categories }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get('/products', { 
            preserveState: true, 
        });
    };

    const resetFilters = () => {
        setData({ search: null, category: null });
        get('/products', {
            data: {},
            preserveState: false,
            replace: true, 
            onSuccess: (page) => console.log('Received filters from backend:', page.props.filters)
        });
    };

    return (
        <MainLayout>
            <Head title="Products" />
            <div className="min-h-screen bg-gray-100 py-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 px-4">Products</h1>

                {/* Search/Filter Form */}
                <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
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
                                className="w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                value={data.category || ''}
                                onChange={(e) => setData('category', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((item) => (
                                    <option key={item.categoryID} value={item.categoryID.toString() }>
                                        {item.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="flex-1 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="flex-1 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </form>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {products.data.map((product) => (
                        <div
                            key={product.productID}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <MultipleImages images={product.image} name={product.name} />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
                                <p className="text-lg font-bold text-gray-900 mt-2">RM{product.price}</p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-600">
                                        Category: <span className="text-gray-800">{product.category_name}</span>
                                    </p>
                                </div>
                                <Link
                                    href={`/products/${product.productID}`}
                                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex justify-center space-x-2 px-4 overflow-auto">
                    {products.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-1 text-sm rounded ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}