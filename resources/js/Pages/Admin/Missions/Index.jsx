import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Missions({missions}) {
    const { delete: destroy } = useForm();

    console.log(missions);
    
    
    function delsubmit(e, mission, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the mission from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("missions.delete", mission));
                Swal.fire("Deleted!", "The mission has been removed.", "success");
            }
        });
    }
    return (
        <AdminLayout
            title="Mission List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Missions" }
            ]}
        >
            <Head title="Missions" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <Link href="/admin/missions/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Create Mission </Link>
                <div className="overflow-x-auto">
                {missions && missions.length > 0 && (
                    <DataTable id="missionsTable" className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Goal</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map((mission) => (
                                <tr key={mission.id}>
                                    <td className="px-4 py-2">{mission.id}</td>
                                    <td className="px-4 py-2">{mission.mission_name}</td>
                                    <td className="px-4 py-2">{mission.mission_description}</td>
                                    <td className="px-4 py-2">{mission.mission_goal}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={(e) => delsubmit(e, mission, mission.mission_name)}  className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </DataTable>
                )}
                </div>
            </div>
        </AdminLayout>
    )
}