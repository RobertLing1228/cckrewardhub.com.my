import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import WheelSpinWidget from "@/Components/WheelSpin";
import MultipleImages from "@/Components/MultipleImages";

export default function Home() {
    const { product, recipe, promotion } = usePage().props; // Get 'product' from props

    return (
        <MainLayout>
            <Head title="Home" />

            <h1 className="title">Welcome!</h1>

            <div>
                Games
            </div>

            <div className="carousel">
                <h2 className="text-2xl font-bold mb-4">Promotions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {promotion.map((promotion) => (
                        <div
                            key={promotion.promotionID}
                            className="p-4 border rounded-md shadow-sm"
                        >

                        <Link   
                            href={`/promotions/${promotion.promotionID}`}
                            className="text-link mt-2 block"
                        >
                            <div key={promotion.promotionID} className="p-4 border rounded-md shadow-sm">
                                
                                <h3 className="font-bold text-lg mt-2">{promotion.title}</h3>
                                <p className="text-sm text-gray-600">{promotion.description}</p>
                            </div>
                        </Link>
                        </div>
                ))}
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recipe.map((recipe) => (
                        <div
                            key={recipe.recipeID}
                            className="p-4 border rounded-md shadow-sm"
                        >

                        <Link
                            href={`/recipes/${recipe.recipeID}`}
                            className="text-link mt-2 block"
                        >
                            <div key={recipe.recipeID} className="p-4 border rounded-md shadow-sm">
                                <MultipleImages images={recipe.image} name={recipe.title} />
                                <h3 className="font-bold text-lg mt-2">{recipe.title}</h3>
                            </div>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Products</h2>        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {product.map((product) => (
                    <div
                        key={product.productID}
                        className="p-4 border rounded-md shadow-sm"
                    >

                    <Link
                        href={`/product/${product.productID}`}
                        className="text-link mt-2 block"
                    >
                    <div key={product.id} className="p-4 border rounded-md shadow-sm">
                        <MultipleImages images={product.image} name={product.name} />
                        <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                        <p className="font-bold text-blue-500 mt-2">${product.price}</p>
                    </div>
                    </Link>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}
