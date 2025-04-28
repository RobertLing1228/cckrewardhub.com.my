import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';
import axios from 'axios'; 

export default function GamePage() {
    const [showCompletion, setShowCompletion] = useState(false);

    useEffect(() => {
        const handleGameMessage = async (event) => {
            if (event.origin !== window.location.origin) {
                return; // Ignore if message is from different origin
            }
        
            if (event.data.gameScore !== undefined) {
                const gameScore = event.data.gameScore;
                console.log("Game score received:", gameScore);
        
                if (gameScore >= 300 && !showCompletion) {
                    setShowCompletion(true);
        
                    try {
                        await axios.post("/missions/2/progress", { progress: 1 });
                        console.log("Mission progress updated successfully.");
                    } catch (error) {
                        console.error("Failed to update mission progress:", error);
                    }
        
                    window.parent.postMessage(
                        { type: 'missionComplete', missionId: 2 },
                        window.location.origin
                    );
                }
            }
        };        

        window.addEventListener('message', handleGameMessage);

        return () => {
            window.removeEventListener('message', handleGameMessage);
        };
    }, [showCompletion]);

    const handleReturnToMissions = () => {
        router.visit('/games', {
            only: [],
            onFinish: () => {
                window.location.reload();
            }
        });
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                {showCompletion ? (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg max-w-md text-center">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                            <p className="mb-6">You've reached 300 points! Mission completed.</p>
                            <button
                                onClick={handleReturnToMissions}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Return to Missions
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Play the Game</h1>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <iframe
                                src="/match3-gamever4/index.html"
                                title="Match 3 Game"
                                width="100%"
                                height="600px"
                                style={{ border: 'none' }}
                                allow="autoplay; fullscreen"
                            />
                            <div className="mt-4">
                                <button
                                    onClick={() => router.visit('/games')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                >
                                    Back to Missions
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
