import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Home() {
    const { flash, product } = usePage().props; // Get 'product' from props

    return (
        <MainLayout>
            <Head title="Home" />

            <h1 className="title">Products</h1>
            {flash?.message && (
                <div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white">
                    {flash.message}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.map((product) => (
                    <div key={product.id} className="p-4 border rounded-md shadow-sm">
                        <img
                            src={product.image} // Assuming 'image' contains a valid image URL
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-md"
                        />
                        <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="font-bold text-blue-500 mt-2">${product.price}</p>
                        <Link
                            href={`/product/${product.id}`}
                            className="text-link mt-2 block"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}
