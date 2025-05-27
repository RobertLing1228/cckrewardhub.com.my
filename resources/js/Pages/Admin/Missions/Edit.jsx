import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit ({mission, flash}) {

    const {data, setData, post, errors, processing} = useForm({
        mission_name: mission.mission_name,
        mission_description: mission.mission_description,
        mission_goal: mission.mission_goal,
        mission_image: '',
        error: flash.error
    })


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mission_name", data.mission_name);
        formData.append("mission_description", data.mission_description);
        formData.append("mission_goal", data.mission_goal);  // Append file
        formData.append("mission_image", data.mission_image);

        post(route('missions.update', mission), formData,
            {
                forceFormData: true
            }
        );
    }

    console.log(errors);


    return (
        <AdminLayout
            title="Edit Mission"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Missions", url: "/admin/missions" },
                { label: "Edit Mission" }
            ]}
        >   
            <Head title="Edit Mission" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Mission Name</label>
                    <input 
                        type="text" 
                        value={data.mission_name}
                        onChange={(e) => setData("mission_name", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <label>Description</label>
                    <textarea 
                    rows="4" 
                    value={data.mission_description}
                    onChange={(e) => setData("mission_description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Goal</label>
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={data.mission_goal}
                        onChange={(e) => setData("mission_goal", e.target.value)}
                        className={errors.goal && "!ring-red-500"}
                    />

                    <label>Image</label>
                        {errors.mission_image && <div className="error">{errors.mission_image}</div>}
                        <input 
                        type="file" 
                        className="border p-2 w-full rounded-md"
                        onChange={(e) => setData("mission_image", e.target.files[0])}
                    />

                    <p>Changes:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Title</th>
                                <th className="font-bold">Description</th>
                                <th className="font-bold">Goal</th>
                                <th className="font-bold">Image</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{mission.mission_name}</td>
                                <td>{mission.mission_description}</td>
                                <td>{mission.mission_goal}</td>
                                <td>{mission.mission_image}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.mission_name}</td>
                                <td>{data.mission_description}</td>
                                <td>{data.mission_goal}</td>
                                <td>{data.mission_image}</td>
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