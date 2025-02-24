import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create ({ categories }) {

    const {data, setData, post, errors, processing} = useForm({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
    })

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("image", data.image);  // Append file

        post('/admin/products/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    console.log(errors);

    return (
        <AdminLayout
            title="Add Product"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Products", url: "/admin/products" },
                { label: "Add Product" }
            ]}
        >   
            <Head title="Add Product" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Name</label>
                    {errors.name && <div className="error">{errors.name}</div>}
                    <input 
                        type="text" 
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <label>Price</label>
                    {errors.price && <div className="error">{errors.price}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Category</label>
                    {errors.cateogry && <div className="error">{errors.category}</div>}
                    <select onChange={(e) => setData("category", e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.categoryID}>{category.categoryName}</option>
                        ))}
                    </select>

                    <label>Image</label>
                    {errors.image && <div className="error">{errors.image}</div>}
                    <input 
                    type="file" 
                    className="border p-2 w-full rounded-md"
                    onChange={(e) => setData("image", e.target.files[0])}
                    />

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Name</th>
                                <th className="font-bold">Price</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Category</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
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