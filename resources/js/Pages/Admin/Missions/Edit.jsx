import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit ({mission}) {

    const {data, setData, post, errors, processing} = useForm({
        name: mission.mission_name,
        description: mission.mission_description,
        goal: mission.mission_goal,
    })


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mission_name", data.title);
        formData.append("mission_description", data.description);
        formData.append("mission_goal", data.goal);  // Append file

        post(`/admin/missions/${mission.missionID}`,
            {
                data: formData,
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
                    {errors.name && <div className="error">{errors.name}</div>}
                    <input 
                        type="text" 
                        value={mission.mission_name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={mission.mission_description}
                    onChange={(e) => setData("description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Goal</label>
                    {errors.goal && <div className="error">{errors.goal}</div>}
                    <input 
                        type="number"
                        min={1}
                        step="any"
                        value={mission.mission_goal}
                        onChange={(e) => setData("goal", e.target.value)}
                        className={errors.name && "!ring-red-500"}
                    />

                    <p>Changes:</p>
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
                                <td>{mission.mission_name}</td>
                                <td>{mission.mission_description}</td>
                                <td>{mission.mission_goal}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.title}</td>
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