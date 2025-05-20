import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Add () {

    const {data, setData, post, errors, processing} = useForm({
        mission_name: 'Scan a QR Code',
        mission_description: '',
        mission_goal: 1,
        mission_image: '',
    })

    const handleMissionChange = (e) => {
        const value = e.target.value;
        setData("mission_name", value);

        // Set default goal based on selected mission type
        switch (value) {
            case "Scan a QR Code":
                setData("mission_goal", 1); // Could represent QR ID 1
                break;
            case "Play Match-3 Game":
                setData("mission_goal", 100); // Default score threshold
                break;
            case "Spin the Prize Wheel":
                setData("mission_goal", 1); // 1 means "Did spin"
                break;
            default:
                setData("mission_goal", 1);
        }
    };


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mission_name", data.mission_name);
        formData.append("mission_description", data.mission_description);
        formData.append("mission_goal", data.mission_goal);  // Append file
        formData.append("mission_image", data.mission_image);

        post('/admin/missions/add', formData,
            {
                forceFormData: true,
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
                    <label>Mission Type</label>
                        {errors.mission_name && <div className="error">{errors.mission_name}</div>}
                        <select 
                            value={data.mission_name}
                            onChange={handleMissionChange}
                            className={errors.mission_name && "!ring-red-500"}
                        >
                            <option>Scan a QR Code</option>
                            <option>Play Match-3 Game</option>
                            <option>Spin the Prize Wheel</option>
                        </select>

                    <label>Description</label>
                    {errors.description && <div className="error">{errors.description}</div>}
                    <textarea 
                    rows="4" 
                    value={data.mission_description}
                    onChange={(e) => setData("mission_description", e.target.value)}
                    className={errors.description && "!ring-red-500"}
                    ></textarea>

                    <label>Goal</label>
                        {errors.mission_goal && <div className="error">{errors.mission_goal}</div>}
                        <input 
                            type="number"
                            min={0}
                            step="any"
                            value={data.mission_goal}
                            onChange={(e) => setData("mission_goal", e.target.value)}
                            className={errors.mission_goal && "!ring-red-500"}
                        />

                    <label>Image</label>
                        {errors.mission_image && <div className="error">{errors.mission_image}</div>}
                        <input 
                        type="file" 
                        className="border p-2 w-full rounded-md"
                        onChange={(e) => setData("mission_image", e.target.files[0])}
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
                                <td>{data.mission_name}</td>
                                <td>{data.mission_description}</td>
                                <td>{data.mission_goal}</td>
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