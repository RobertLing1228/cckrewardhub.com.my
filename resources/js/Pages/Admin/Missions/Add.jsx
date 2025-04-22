import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Add () {

    const {data, setData, post, errors, processing} = useForm({
        name: '',
        description: '',
        goal: null,
    })


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mission_name", data.title);
        formData.append("mission_description", data.description);
        formData.append("mission_goal", data.goal);  // Append file

        post('/admin/missions/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    console.log(errors);


    return (
        <AdminLayout
            title="Add Mission"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Missions", url: "/admin/missions" },
                { label: "Add Mission" }
            ]}
        >   
            <Head title="Add Mission" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Mission Name</label>
                    {errors.name && <div className="error">{errors.name}</div>}
                    <input 
                        type="text" 
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
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

                    <label>Goal</label>
                    {errors.goal && <div className="error">{errors.goal}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={data.goal}
                        onChange={(e) => setData("goal", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Goal</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.description}</td>
                                <td>{data.goal}</td>
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