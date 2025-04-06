import React, { useState, useEffect } from 'react';
import { SpinWheel } from 'spin-wheel-game';
import Modal from './Modal';

// Segments with direct probability control (values should sum to 1)
const segments = [
    { segmentText: 'RM10 Voucher', segColor: 'red', probability: 0.1 },    // 10% chance
    { segmentText: '20% OFF', segColor: 'blue', probability: 0.3 },        // 30% chance
    { segmentText: 'BUY 1 FREE 1', segColor: 'green', probability: 0.6 }, // 60% chance
];

// Verify probabilities sum to 1 (100%)
const totalProbability = segments.reduce((sum, seg) => sum + seg.probability, 0);
if (Math.abs(totalProbability - 1) > 0.0001) {
    console.error('Segment probabilities must sum to 1');
}

const MySpinWheel = ({ isOpen, onClose, onComplete }) => {
    const [spinResult, setSpinResult] = useState('');
    const [isWheelFinished, setIsWheelFinished] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);

    // Modified handleSpinFinish to use controlled probabilities
    const handleSpinFinish = (result) => {
        // Our custom probability-based result selection
        const random = Math.random();
        let cumulativeProbability = 0;
        let selectedSegment = segments[0]; // Default fallback
        
        for (const segment of segments) {
            cumulativeProbability += segment.probability;
            if (random <= cumulativeProbability) {
                selectedSegment = segment;
                break;
            }
        }

        setSpinResult(selectedSegment.segmentText);
        setIsWheelFinished(true);
        setHasSpun(true);
        if (onComplete) onComplete(selectedSegment.segmentText);
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
                        <SpinWheel {...spinWheelProps} />
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