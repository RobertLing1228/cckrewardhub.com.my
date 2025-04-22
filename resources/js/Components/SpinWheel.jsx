import React, { useState, useEffect } from 'react';
import { SpinWheel } from 'spin-wheel-game';
import Modal from './Modal';
import axios from 'axios';

const MySpinWheel = ({ isOpen, onClose, onComplete, updateProgress }) => {
    const [segments, setSegments] = useState([]);
    const [spinResult, setSpinResult] = useState('');
    const [isWheelFinished, setIsWheelFinished] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);

    // Fetch wheel rewards from backend
    useEffect(() => {
        if (isOpen) {
            axios.get('/wheel-rewards')
                .then(response => {
                    const rewards = response.data;
    
                    const mappedSegments = rewards.map(reward => ({
                        segmentValue: reward.voucher_value,
                        segmentText: reward.reward_type === 'voucher' && reward.voucher_value !== null
                            ? `RM ${parseInt(reward.voucher_value)} Voucher`
                            : 'LOSS',
                        segColor: reward.reward_type === 'voucher' ? 'green' : 'red',
                        probability: 1 / rewards.length, // equal chance
                    }));
    
                    setSegments(mappedSegments);
                })
                .catch(error => {
                    console.error('Failed to fetch wheel rewards:', error);
                });
        }
    }, [isOpen]);

    const handleSpinFinish = async () => {
        const random = Math.random();
        let cumulativeProbability = 0;
        let selectedSegment = segments[0]; // fallback
    
        for (const segment of segments) {
            cumulativeProbability += segment.probability;
            if (random <= cumulativeProbability) {
                selectedSegment = segment;
                break;
            }
        }
    
        setSpinResult(`${selectedSegment.segmentText}`);
        setIsWheelFinished(true);
        setHasSpun(true);
    
        if (onComplete) onComplete(selectedSegment.segmentText);
    
        try {
            // Use updateProgress passed as a prop
            await updateProgress(3); // Update progress for mission ID 3
            console.log("Spin mission progress updated successfully.");
        } catch (error) {
            console.error("Failed to update spin mission progress:", error);
        }
    };

    const handleClose = () => {
        setSpinResult('');
        setIsWheelFinished(false);
        setHasSpun(false);
        onClose();  
    };

    useEffect(() => {
        if (!isOpen) {
            setSpinResult('');
            setIsWheelFinished(false);
            setHasSpun(false);
        }
    }, [isOpen]);

    const spinWheelProps = {
        segments: segments.map(({ segmentText, segColor }) => ({ segmentText, segColor })),
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: hasSpun ? 'Spin Again' : 'Spin',
        isOnlyOnce: false,
        size: 180,
        upDuration: 500,
        downDuration: 1000,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        isSpinSound: true,
    };

    return (
        <Modal show={isOpen} onClose={handleClose} maxWidth="lg">
            <div className="p-6 text-center">
                <h2 className="text-xl font-semibold">Try Your Luck!</h2>

                {!isWheelFinished ? (
                    <div className="flex justify-center mt-4">
                        {segments.length > 0 ? (
                            <SpinWheel {...spinWheelProps} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-lg">You won: <strong>{spinResult}</strong></p>
                        <button
                            onClick={() => {

                                setIsWheelFinished(false);
                                setSpinResult('');
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Spin Again
                        </button>
                    </div>
                )}

                <button
                    onClick={handleClose}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default MySpinWheel;
