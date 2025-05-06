import React, {useState, useRef, useEffect} from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create ({categories, products}) {
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
        productID: '',
        category: '',
        title: '',
        description: '',
        image: [],
    })

    const [search, setSearch] = useState('');
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

        post('/admin/recipes/add',
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
                { label: "Products", url: "/admin/recipes" },
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
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className={errors.title && "!ring-red-500"}
                    />

                    <label>Product ID</label>
                    {errors.productid && <div className="error">{errors.productid}</div>}
                    <input
                            type="text"
                            value={productSearchTerm}
                            onChange={handleProductSearchChange}
                            className={`border px-2 py-1 rounded ${errors.productID ? "!ring-red-500" : ""}`}
                            placeholder="Type Product ID or Name..."
                        />

                        {filteredProducts.length > 0 && (
                            <ul
                                ref={productListRef}
                                className="border rounded bg-white max-h-48 overflow-y-auto shadow z-50"
                            >
                                {filteredProducts.slice(0, visibleCount).map((product) => (
                                    <li
                                        key={product.productID}
                                        onClick={() => handleProductSelect(product)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {product.productID} - {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                    

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={data.description}
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




                    <p>Example table:</p>
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