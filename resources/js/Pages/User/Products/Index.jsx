import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import MultipleImages from '@/Components/MultipleImages';

export default function ProductIndex({ products, filters, categories, branches }) {
    const { data, setData } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        branch_id: filters.branch_id || '',
    });

    const [productList, setProductList] = useState(products.data);
    const [nextPage, setNextPage] = useState(products.next_page_url);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get('/products', data, {
            preserveState: false,
            replace: true,
            onSuccess: (page) => {
                setProductList(page.props.products.data);
                setNextPage(page.props.products.next_page_url);
            }
        });
    };

    const resetFilters = () => {
        setData({ search: '', category: '', branch_id: '' });
        router.get('/products', {}, {
            replace: true,
            onSuccess: (page) => {
                setProductList(page.props.products.data);
                setNextPage(page.props.products.next_page_url);
            }
        });
    };

    const loadMore = () => {
        if (!nextPage) return;

        router.get(nextPage, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                setProductList(prev => [...prev, ...page.props.products.data]);
                setNextPage(page.props.products.next_page_url);
            }
        });
    };

    const sortedCategories = [...categories].sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    const sortedBranches = [...branches].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <MainLayout>
            <Head title="Products" />

            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
                <h1 className="text-3xl font-bold text-center text-[#D62828] mb-8">🛍️ Our Products</h1>

                {/* Filters */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto mb-10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-semibold">Branch</label>
                            <select value={data.branch_id} onChange={e => setData('branch_id', e.target.value)} className="mt-1 w-full rounded-md border-gray-300">
                                <option value="">All Branches</option>
                                {sortedBranches.map(branch => (
                                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Category</label>
                            <select value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 w-full rounded-md border-gray-300">
                                <option value="">All Categories</option>
                                {sortedCategories.map(cat => (
                                    <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Search</label>
                            <input type="text" value={data.search} onChange={e => setData('search', e.target.value)} className="mt-1 w-full rounded-md border-gray-300" />
                        </div>
                    </div>
                    <div className="flex justify-between pt-4 gap-3">
                        <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition w-full">
                            Apply Filters
                        </button>
                        <button type="button" onClick={resetFilters} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition w-full">
                            Reset
                        </button>
                    </div>
                </form>

                {/* Products */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productList.length > 0 ? (
                        productList.map(product => (
                            <Link
                                key={product.productID}
                                href={`/products/${product.productID}`}
                                className="block bg-white rounded-xl shadow hover:shadow-lg hover:ring-2 hover:ring-yellow-400 transition overflow-hidden"
                            >
                                <MultipleImages images={product.image} name={product.name} />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                    <p className="text-red-600 font-bold mt-1">RM{product.price}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products found.</p>
                    )}
                </div>

                {/* Load More Button */}
                {nextPage && (
                    <div className="text-center mt-10">
                        <button
                            onClick={loadMore}
                            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}

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

