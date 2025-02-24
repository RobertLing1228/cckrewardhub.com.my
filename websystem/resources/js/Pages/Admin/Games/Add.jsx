import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Add () {

    const {data, setData, post, errors, processing} = useForm({
        title: '',
        description: '',
        image: null,
        gameLink: '',
    })

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);  // Append file
        formData.append("gameLink", data.gameLink);

        post('/admin/games/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    console.log(errors);


    return (
        <AdminLayout
            title="Add Game"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Games", url: "/admin/games" },
                { label: "Add Game" }
            ]}
        >   
            <Head title="Add Game" />
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

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Image</label>
                    {errors.image && <div className="error">{errors.image}</div>}
                    <input 
                    type="file" 
                     
                    className="border p-2 w-full rounded-md"
                    onChange={(e) => setData("image", e.target.files[0])}
                    />

                    <label>Link</label>
                    {errors.gameLink && <div className="error">{errors.gameLink}</div>}
                    <input 
                    type="text" 
                    value={data.gameLink} 
                    className="border p-2 w-full rounded-md"
                    onChange={(e) => setData("gameLink", e.target.value)}
                    />

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Link</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.title}</td>
                                <td>{data.description}</td>
                                <td>{data.gameLink}</td>
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