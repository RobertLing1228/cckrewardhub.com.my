import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import MultipleImages from "@/Components/MultipleImages";
import BannerSwiper from "@/Components/BannerSwiper";


export default function Home() {
    const { product, recipe, user, banners } = usePage().props;

    return (
        <MainLayout>
            <Head title="Home" />

            {/* Welcome Header */}
            <div className="text-center py-6 bg-yellow-50 shadow-sm rounded-xl mb-6">
                <h1 className="text-3xl font-bold text-[#D62828]">
                    Welcome, {user?.memberID || "Guest"} 👋
                </h1>
                <p className="text-gray-600 mt-2 text-sm">Explore our latest deals, games & recipes!</p>
            </div>

            {/* Banner
             */}
             <div className="mb-8">
                <BannerSwiper banners={banners} />
            </div>
            

            {/* Section: Recipes */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-600 mb-4 border-b pb-2">🍽 Recipes</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recipe.map((recipe) => (
                        <Link
                            key={recipe.recipeID}
                            href={`/recipes/${recipe.recipeID}`}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            <div className="p-4">
                                <MultipleImages images={recipe.image} name={recipe.title} />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                    {recipe.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Section: Products */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-yellow-600 mb-4 border-b pb-2">🛒 Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {product.map((product) => (
                        <Link
                            key={product.productID}
                            href={`/product/${product.productID}`}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            <div className="p-4">
                                <MultipleImages images={product.image} name={product.name} />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                    {product.name}
                                </h3>
                                <p className="text-red-600 font-bold mt-1">RM{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
