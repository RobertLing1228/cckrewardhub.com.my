import React from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function GamePage() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Play the Game</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <iframe
                        src="/match3-gamever4/index.html"
                        title="Game"
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </MainLayout>
    );
}