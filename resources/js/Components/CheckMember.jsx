import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function CheckMember() {
    const { data, setData, post, processing, reset } = useForm({
        memberID: "",
        phoneNumber: "",
        currentDate: new Date().toISOString().slice(0, 10),
    });

    const { flash } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isMemberIDValid = /^\d{10}$/.test(data.memberID);
        const isPhoneNumberValid = /^\d{10}$/.test(data.phoneNumber);

        if (!isMemberIDValid || !isPhoneNumberValid) {
            alert("Both Member ID and Phone Number must contain exactly 10 digits.");
            return;
        }

        post("/check-member", {
            onSuccess: () => {
                console.log("Success!");
                reset();
                setIsOpen(false); // Close the form after successful submission
            },
        });
    };

    return (
        <div className="p-4">
            {flash.success && <div className="alert alert-success">{flash.success}</div>}
            {flash.error && <div className="alert alert-danger">{flash.error}</div>}
            {/* Claim Prize Button */}
            <button 
                onClick={() => setIsOpen(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Claim Prize
            </button>

            <div>
                <p>Current Date: {data.currentDate}</p>
            </div>

            {/* Popup Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>


                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Membership ID"
                                value={data.memberID}
                                onChange={(e) => setData("memberID", e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={data.phoneNumber}
                                onChange={(e) => setData("phoneNumber", e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                            <div className="flex justify-between">
                                <button 
                                    type="submit" 
                                    className="bg-green-500 text-white px-4 py-2 rounded" 
                                    disabled={processing}
                                >
                                    {processing ? "Processing..." : "Submit"}
                                </button>
                                <button 
                                    type="button" 
                                    className="bg-red-500 text-white px-4 py-2 rounded" 
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
