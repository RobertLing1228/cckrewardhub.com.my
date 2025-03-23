import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "datatables.net-react";// Core DataTables library
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function Games ({ games }) {
    const { delete: destroy } = useForm();

    function updsubmit(e, game){
        e.preventDefault();

        router.visit(route('games.edit', game));
    }

    function delsubmit(e, game, title) {
        e.preventDefault();
    
        Swal.fire({
            title: 'Delete "' + title + '" ?',
            text: "This will remove the game from the list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("games.delete", game));
                Swal.fire("Deleted!", "The game has been removed.", "success");
            }
        });
    }

    return (
        <AdminLayout
            title="Games List"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Games" }
            ]}
        >   
            <Head title="Games List" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <Link href="/admin/games/add" className="bg-blue-500 text-white px-3 py-1 rounded mb-4">Add new Game </Link>
            <div className="overflow-x-auto">
                <DataTable id="gamesTable" className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Link</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                    <tr key={game.gameID} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{game.gameID}</td>
                        <td className="px-4 py-2 border">{game.title}</td>
                        <td className="px-4 py-2 border truncate max-w-[150px]">
                        {game.description}
                        </td>
                        <td className="px-4 py-2 border">
                        <img
                            src={game.image ? `${window.location.origin}/storage/${game.image}` : 'https://via.placeholder.com/150'} 
                            alt={game.title}
                            className="w-12 h-12 object-cover rounded"
                        />
                        </td>
                        <td className="px-4 py-2 border">{game.gameLink}</td>
                        <td className="px-4 py-2 border">
                                <button onClick={(e) => updsubmit(e, game)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={(e) => delsubmit(e, game, game.title)}  className="bg-red-500 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                        
                        </td>
                    </tr>
                    ))}
                </tbody>
                </DataTable>
            </div>
            </div>
        </AdminLayout>
    );
};