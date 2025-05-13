import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import MultipleImages from "@/Components/MultipleImages";
import BannerSwiper from "@/Components/BannerSwiper";
import HotItemsSwiper from '@/Components/HotItemsSwiper';

export default function Home() {
    const { product, recipe, user, banners} = usePage().props;

    return (
        <MainLayout>
            <Head title="Home" />

            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8 mx-4 sm:mx-0">
                <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        👋 Hello, user{user?.memberID || "Guest"}!
                    </h1>
                    <p className="mt-2 text-sm sm:text-base font-medium opacity-90">
                        Discover hot deals, exciting games & delicious recipes.
                    </p>
                </div>
            </div>

            {/* Banner */}
            <div className="mb-8 px-4 sm:px-0">
                <BannerSwiper banners={banners} />
            </div>

            {/* Recipes Section */}
            <section className="mb-12 px-4 sm:px-0">
                <h2 className="text-2xl font-bold text-yellow-600 mb-4 border-b pb-2">🍜 What to Cook Today?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipe.map((r) => (
                        <Link
                            key={r.recipeID}
                            href={`/recipes/${r.recipeID}`}
                            className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            <div className="p-4">
                                <MultipleImages images={r.image} name={r.title} />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">{r.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Product Section */}
            <HotItemsSwiper products={product} />
        </MainLayout>
    );
}
