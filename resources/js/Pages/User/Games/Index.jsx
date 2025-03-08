import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import CheckMember from '@/Components/CheckMember';


export default function GameIndex ({ games }) {
    return (
        <MainLayout>
            <Head title="Games" />
        <div className="min-h-screen bg-gray-100 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Game</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <div
                            key={game.gameID}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >

                            <img 
                                src={`${window.location.origin}/storage/${game.image}`} 
                                alt={game.title} 
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{game.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">{game.description}</p>
                                <Link
                                    href={game.gameLink} 
                                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Play
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                <div>
                    <CheckMember></CheckMember>
                </div>
        </MainLayout>
    );
}
