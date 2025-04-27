import React, { useState } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import Modal from "./Modal";

export default function PrizeView({ onClose, game, prizevalue ,prizename}) {
    const [claimed, setClaimed] = useState(false);
    const { props } = usePage();
    const successMessage = props.flash?.success;

    const {processing, errors} = useForm();
    
    console.log(game);

    function handleClaim(){
        
        router.post("/claim", { gameType: game, prize: prizevalue}, {
            onSuccess: () => {
              console.log("Claim successful");
              setClaimed(true);
            },
            onError: (errors) => {
              console.error("Error claiming:", errors);
            },
          });
    };

    return (
        <Modal show={true} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="text-lg font-bold">Claim Your Prize</h2>
                <div className="border-2 border-dashed border-yellow-500 rounded-lg p-4 bg-yellow-50 text-center mb-4">
                <p className="text-sm text-yellow-700">You won:</p>
                <p className="text-xl font-bold text-yellow-800">{prizename || "This"}</p>
                </div>

                {claimed ? (
                    <p className="mt-4 text-green-600">🎉 Prize Claimed!</p> &&
                    <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                        <p>{successMessage}</p>
                    </div>
                    
                ) : (
                    <button
                        disabled={processing}
                        onClick={handleClaim}
                        className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        {processing ? "Processing..." : "Claim Prize"}
                    </button>
                )}

                {errors && <p className="mt-4 text-red-600">{errors.message}</p>}

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

    
