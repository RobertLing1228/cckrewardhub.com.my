import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";

export default function Add() {
    const { data, setData, post, errors, processing } = useForm({
        game_type: '',
        start_date: '',
        end_date: '',
        reset_day: ''
    });


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("game_type", data.game_type);
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);
        formData.append("reset_day", data.reset_day);

        post("/admin/resettimes/add", {
            data: formData,
            forceFormData: true,
        });
    }

    return (
        <AdminLayout
            title="Add Reset Timer"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Reset Timers", url: "/admin/resettimes" },
                { label: "Add Reset Timer" },
            ]}
        >
            <Head title="Add Reset Timer" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="mx-auto">
                    <form className="flex flex-col gap-4" onSubmit={submit}>
                        {/* Game Type */}
                        <div>
                            <label className="font-bold block mb-2">Game Type</label>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="border px-4 py-2 rounded bg-gray-200 w-full text-left"
                                    >
                                        {data.game_type || "Select Game Type"}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Button onClick={() => setData("game_type", "mission")}>
                                        Mission
                                    </Dropdown.Button>
                                    <Dropdown.Button onClick={() => setData("game_type", "wheel")}>
                                        Wheel
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                            {errors.game_type && <div className="text-red-500 text-sm mt-1">{errors.game_type}</div>}
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="font-bold block mb-2">Start Date & Time</label>
                            <input
                                type="datetime-local"
                                value={data.start_date}
                                onChange={(e) => setData("start_date", e.target.value)}
                                className="border px-4 py-2 rounded w-full"
                            />
                            {errors.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="font-bold block mb-2">End Date & Time</label>
                            <input
                                type="datetime-local"
                                value={data.end_date}
                                onChange={(e) => setData("end_date", e.target.value)}
                                className="border px-4 py-2 rounded w-full"
                            />
                            {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
                        </div>

                        {/* Reset Day */}
                        <div>
                            <label className="font-bold block mb-2">Reset Day (0 = Sunday, 1 = Monday, etc.)</label>
                            <select
                                value={data.reset_day}
                                onChange={(e) => setData("reset_day", Number(e.target.value))}
                                className="border px-4 py-2 rounded w-full"
                            >
                                <option value="">Select Reset Day</option>
                                <option value="0">Sunday</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                            </select>
                            {errors.reset_day && <div className="text-red-500 text-sm mt-1">{errors.reset_day}</div>}
                        </div>

                        {/* Example table */}
                        <p className="mt-4 font-semibold">Example table:</p>
                        <table className="table w-full border border-gray-300 mt-2">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="font-bold border px-2 py-1">Game Type</th>
                                    <th className="font-bold border px-2 py-1">Start Date</th>
                                    <th className="font-bold border px-2 py-1">End Date</th>
                                    <th className="font-bold border px-2 py-1">Reset Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-2 py-1">{data.game_type}</td>
                                    <td className="border px-2 py-1">{data.start_date}</td>
                                    <td className="border px-2 py-1">{data.end_date}</td>
                                    <td className="border px-2 py-1">{data.reset_day}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
                            disabled={processing}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
