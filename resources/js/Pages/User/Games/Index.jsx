import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';  
import MySpinWheel from '@/Components/SpinWheel';
import MissionList from '@/Components/MissionList';
import { SpinWheel } from 'spin-wheel-game';


export default function GameIndex({ games }) {
    const [showPrizeModal, setShowPrizeModal] = useState(false);
    const [prize, setPrize] = useState({
        code: "VOUCHER123",
        name: "Free Sausage Packet 100g",
        date_issued: "2025-04-01",
        end_date: "2025-04-30",
        status: "active",
        discount_type: "percentage",
        discount_value: 100,
        usage_limit: 1
      });

    return (
        <MainLayout>
            <Head title="Games" />
            <div className="min-h-screen bg-gray-100 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Games</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {games.map((game) => (
                        <div
                            key={game.gameID}
                            className="flex flex-col rounded-2xl w-full max-w-[500px] bg-white shadow-xl mx-auto"
                        >
                            <figure className="flex justify-center items-center rounded-2xl">
                                <img
                                    src={`${window.location.origin}/storage/${game.image}`}
                                    alt="Card Preview"
                                    className="rounded-t-2xl w-full h-56 object-cover"
                                />
                            </figure>
                            <div className="flex flex-col p-6">
                                <h2 className="text-2xl font-bold text-gray-800 pb-4">{game.title}</h2>
                                <p className="text-lg text-gray-700">{game.description}</p>
                                <div className="flex justify-end pt-6">
                                    <Link
                                        href={`/play?game=${game.gameID}`}
                                        className="bg-purple-700 text-white w-full font-bold text-base text-center p-3 rounded-lg hover:bg-purple-800 active:scale-95 transition-transform"
                                    >
                                        Play
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <MissionList/>
            <div>
                <MissionList missions={["Mission 1", "Mission 2", "Mission 3"]} />
            </div>

            <MySpinWheel/>
            <button
                onClick={() => setShowPrizeModal(true)}
                className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
                Open Prize Claim Modal
            </button>

            {showPrizeModal && (
                <PrizeView
                    game = "Mission"
                    onClose={() => setShowPrizeModal(false)}
                />
            )}
        </MainLayout>
    );
}
