import React, {useState, useEffect, useRef} from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit ({ recipe, categories, products }) {
    const [productSearchTerm, setProductSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productListRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(15);

    useEffect(() => {
        const list = productListRef.current;
        if (!list) return;
        
        const handleScroll = () => {
            if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
            // Near bottom, load more
            setVisibleCount((prev) => prev + 15);
            }
        };
        
        list.addEventListener("scroll", handleScroll);
        return () => list.removeEventListener("scroll", handleScroll);
    }, [filteredProducts]);

    const {data, setData, post, errors, processing} = useForm({
        productID: recipe.productID,
        category: recipe.category,
        title: recipe.title,
        description: recipe.description,
        image: [],
    })

    const [search, setSearch] = useState(data.category);
    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
    );

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productID", data.productID);
        formData.append("category", data.category);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);  // Append file

        post(`/admin/recipes/${recipe.recipeID}`,
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    const handleProductSearchChange = (e) => {
        const value = e.target.value;
        setProductSearchTerm(value);
        const filtered = products.filter((p) =>
            `${p.productID} ${p.name}`.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
        setVisibleCount(15);
    };
    
    const handleProductSelect = (product) => {
        setData("productID", product.productID);
        setProductSearchTerm(`${product.productID} - ${product.name}`);
        setFilteredProducts([]);
    };

    console.log(errors);

    return (
        <AdminLayout
            title="Add Recipe"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Recipes", url: "/admin/recipes" },
                { label: "Add Recipe" }
            ]}
        >   
            <Head title="Add Recipe" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>

                    <label>Title</label>
                    {errors.title && <div className="error">{errors.title}</div>}
                    <input 
                        type="text" 
                        value={recipe.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />

                    <label>Product ID</label>
                    {errors.productid && <div className="error">{errors.productid}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={recipe.productID}
                        onChange={(e) => setData("productid", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />

                    

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={recipe.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Category (type to search):</label>
                    <input
                        type="text"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setData('category', e.target.value); // Sync to form
                        }}
                        list="category-options"
                    />
                    <datalist id="category-options">
                        {filteredCategories.map((cat, i) => (
                            <option key={i} value={cat} />
                        ))}
                    </datalist>
                    {errors.category && <div>{errors.category}</div>}

                    <label>Image</label>
                    {errors.image && <div className="error">{errors.image}</div>}
                    <input 
                    type="file" 
                    multiple
                    className="border p-2 w-full rounded-md"
                    onChange={(e) => setData("image", Array.from(e.target.files))}
                    />




                    <h2 className="font-bold mt-4">Changes:</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Product ID</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Category</th>

                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{recipe.title}</td>
                                <td>{recipe.productID}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.category}</td>


                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td>{data.title}</td>
                                <td>{data.productID}</td>
                                <td>{data.description}</td>
                                <td>{data.category}</td>


                            </tr>
                        </tbody>
                        
                        
                    </table>

                    <button className="primary-btn mt-4" disabled={processing}>Submit</button>
                </form>
                
            </div>
            </div>
        </AdminLayout>
    );
};