import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Modal from "./Modal";

export default function PrizeView({ prize, onClose }) {
    const { post, processing } = useForm();
    const [claimed, setClaimed] = useState(false);

    const handleClaim = () => {
        post("/vouchers/claim", {
            data: { prize },
            onSuccess: () => setClaimed(true),
        });
    };

    return (
        <Modal show={true} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-bold">Claim Your Prize</h2>
                <p className="mt-2">You won: <span className="font-semibold">{prize}</span></p>

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

    
