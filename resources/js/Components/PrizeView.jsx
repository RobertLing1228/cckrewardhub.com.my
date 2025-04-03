import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "./Modal";

export default function PrizeView({ prize, onClose }) {
    const [claimed, setClaimed] = useState(false);

    const {post, processing} = useForm();
    
    const [prize2, setPrize2] = useState({
            code: "VOUCHER123",
            name: "Free Sausage Packet 100g",
            date_issued: "2025-04-01",
            end_date: "2025-04-30",
            status: "active",
            discount_type: "percentage",
            discount_value: 100,
            usage_limit: 1
          });

    const handleClaim = () => {
        post("/vouchers/claim", {
            ...prize2,
            onSuccess: (response) => {console.log(response), setClaimed(true)},
            onError: (error) => {console.log(error)},
        });
    };

    return (
        <Modal show={true} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-bold">Claim Your Prize</h2>
                <p className="mt-2">You won: <span className="font-semibold">{prize2.name}</span></p>

                {claimed ? (
                    <p className="mt-4 text-green-600">🎉 Prize Claimed!</p>
                ) : (
                    <button
                        onClick={handleClaim}
                        className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        {processing ? "Processing..." : "Claim Prize"}
                    </button>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}

    
