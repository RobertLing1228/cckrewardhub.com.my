import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create () {

    const {data, setData, post, errors, processing} = useForm({
        productid: '',
        category: '',
        title: '',
        description: '',
        image: '',
    })

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productid", data.productid);
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
                        type="number"
                        min={1}
                        step="any"
                        value={data.productid}
                        onChange={(e) => setData("productid", e.target.value)}
                        className={errors.title && "!ring-red-500"}
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
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                        <option value="Other">Other</option>
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
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Product ID</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Category</th>

                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.title}</td>
                                <td>{data.productid}</td>
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