import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";

export default function Add ({reward}) {

    const {data, setData, post, errors, processing} = useForm({
        reward_type: reward.reward_type,
        voucher_value: reward.voucher_value,
        probability: reward.probability,
    })

    const [showVoucherDropdown, setShowVoucherDropdown] = useState(false);


    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("reward_type", data.reward_type);
        formData.append("voucher_value", data.voucher_value);
        formData.append("probability", data.probability);

        post(`/admin/wheelrewards/${reward.id}`,
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
            setData('voucher_value', null)
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
                        <label className="font-bold block mb-2">Select Voucher Value</label>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="border px-4 py-2 rounded bg-gray-100 w-full text-left"
                                >
                                    {data.voucher_value || 'Select Voucher'}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {['RM2', 'RM3', 'RM5', 'Loss'].map((label, index) => (
                                    <Dropdown.Button
                                    key={index}
                                    onClick={() => setData('voucher_value', 
                                        label === 'Loss' ? null 
                                        : parseFloat(label.replace('RM', ''))
                                    )}
                                    >
                                    {label}
                                    </Dropdown.Button>
                                ))}
                                </Dropdown.Content>
                        </Dropdown>
                    </div>
                )}

                    <label>Probability</label>
                        {errors.probability && <div className="error">{errors.probability}</div>}
                    <input 
                        type="number"
                        min={0}
                        step="any"
                        value={data.probability}
                        onChange={(e) => setData("probability", e.target.value)}
                        className={errors.probability && "!ring-red-500"}
                    />

                    <p>Changes:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Reward Type</th>
                                <th className="font-bold">Voucher Value</th>
                                <th className="font-bold">Probability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{reward.reward_type}</td>
                                <td>{reward.voucher_value}</td>
                                <td>{reward.probability}</td>
                            </tr>
                        </tbody>
                        
                        <tbody>
                            <tr>
                                <td>{data.reward_type}</td>
                                <td>{data.voucher_value}</td>
                                <td>{data.probability}</td>
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