import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";

export default function Add ({vouchers}) {

    const {data, setData, post, errors, processing} = useForm({
        reward_type: '',
        voucher_id: ''
    })

    const [showVoucherDropdown, setShowVoucherDropdown] = useState(false);


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reward_type", data.reward_type);
        formData.append("voucher_id", data.voucher_id);

        post('/admin/wheelrewards/add',
            {
                data: formData,
                forceFormData: true
            }
        );
    }

    function handleRewardSelect(type) {
        setData('reward_type', type);
        if (type === 'voucher') {
            setShowVoucherDropdown(true);
        } else {
            setShowVoucherDropdown(false);
        }
    }


    return (
        <AdminLayout
            title="Add Wheel Reward"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Wheel Rewards", url: "/admin/wheelrewards" },
                { label: "Add Wheel Reward" }
            ]}
        >   
            <Head title="Add Wheel Reward" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    
                {/* REWARD TYPE DROPDOWN */}
                <div>
                    <label className="font-bold block mb-2">Reward Type</label>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="border px-4 py-2 rounded bg-gray-200 w-full text-left"
                            >
                                {data.reward_type || 'Select Reward Type'}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Button onClick={() => handleRewardSelect('loss')}>
                                Loss
                            </Dropdown.Button>
                            <Dropdown.Button onClick={() => handleRewardSelect('voucher')}>
                                Voucher
                            </Dropdown.Button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {/* VOUCHER DROPDOWN */}
                {showVoucherDropdown && (
                    <div>
                        <label className="font-bold block mb-2">Select Voucher ID</label>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="border px-4 py-2 rounded bg-gray-100 w-full text-left"
                                >
                                    {data.voucher_id || 'Select Voucher'}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {vouchers.length === 0 && (
                                    <div className="px-4 py-2 text-sm text-gray-400">No vouchers</div>
                                )}
                                {vouchers.map(voucher => (
                                    <Dropdown.Button
                                        key={voucher.id}
                                        onClick={() => setData('voucher_id', voucher.id)}
                                    >
                                        {voucher.id} - {voucher.name}
                                    </Dropdown.Button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                )}

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Reward Type</th>
                                <th className="font-bold">Voucher ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.reward_type}</td>
                                <td>{data.voucher_id}</td>
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