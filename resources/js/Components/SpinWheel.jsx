import React, { useState } from 'react';
import { SpinWheel } from 'spin-wheel-game';
import Modal from './Modal'; // Import the modal component

const segments = [
    { segmentText: 'RM10 Voucher', segColor: 'red' },
    { segmentText: '20% OFF', segColor: 'blue' },
    { segmentText: 'BUY 1 FREE 1', segColor: 'green' },
];

const MySpinWheel = () => {
    const [spinResult, setSpinResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWheelFinished, setIsWheelFinished] = useState(false);

    const handleSpinFinish = (result) => {
        setSpinResult(result);
        setIsWheelFinished(true); // Mark that the wheel has finished spinning
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsWheelFinished(false); // Reset wheel state when reopening
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSpinResult('');
    };

    const spinWheelProps = {
        segments,
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: 'Spin',
        isOnlyOnce: false,
        size: 180, // Adjusted size to fit inside modal
        upDuration: 200,
        downDuration: 600,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        isSpinSound: true,
    };

    return (
        <div className="flex flex-col items-center">
            {/* Open Modal Button */}
            <button 
                onClick={handleOpenModal} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Open Spin Wheel
            </button>

            {/* Spin Wheel Modal */}
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold">Try Your Luck!</h2>

                    {/* Show Wheel if the spin hasn't finished yet */}
                    {!isWheelFinished && (
                        <div className="flex justify-center mt-4">
                            <SpinWheel {...spinWheelProps} />
                        </div>
                    )}

                    {/* Show Result when the wheel finishes */}
                    {isWheelFinished && (
                        <div className="mt-4 flex justify-center text-center">
                            <p className="text-lg">You won: <strong>{spinResult}</strong></p>
                        </div>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={handleCloseModal}
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MySpinWheel;
