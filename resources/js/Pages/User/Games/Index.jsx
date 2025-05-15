import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';  
import MySpinWheel from '@/Components/SpinWheel';
import MissionList from '@/Components/MissionList';
import PrizeView from '@/Components/PrizeView';


export default function GameIndex({ games }) {
    const [showPrizeModal, setShowPrizeModal] = useState(false);
    const [prize, setPrize] = useState({
        code: "VOUCHER123",
        name: "RM3 Cash Voucher",
        date_issued: "2025-04-01",
        end_date: "2025-04-30",
        status: "unclaimed",
        discount_type: "percentage",
        discount_value: "3.00",
        usage_limit: "1"
      });

    return (
        <MainLayout>
            <Head title="Games" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12 px-6 rounded-b-3xl shadow-lg">
                <h1 className="text-4xl font-extrabold text-center mb-2">Let’s Play & Win!</h1>
                <p className="text-center text-lg">Complete missions, spin the wheel, and enjoy fun games to earn real rewards.</p>
            </section>

            {/* Game Cards */}
            <section className="py-10 px-4 bg-[#f2f2f2]">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Available Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {games.map((game) => (
                        <div
                            key={game.gameID}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1"
                        >
                            <img
                                src={`${window.location.origin}/storage/${game.image}`}
                                alt={game.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6 flex flex-col justify-between h-[220px]">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                                <p className="text-gray-600 text-sm flex-grow">{game.description}</p>
                                <Link
                                    href={`/play?game=${game.gameID}`}
                                    className="mt-4 bg-purple-700 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-purple-800 transition"
                                >
                                    Play Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission section title with history link*/}
            <div className="px-4 mt-12 mb-4 flex items-center justify-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Missions</h2>
                <span className="mx-2 text-gray-300">|</span>
                <Link
                    href="/mission-history"
                    className="text-xs text-gray-400 hover:text-gray-600 transition"
                >
                    View History
                </Link>
            </div>



            <MissionList/>
            
            <MySpinWheel/>

            {/* Prize Modal */}
            {showPrizeModal && (
                <PrizeView
                    game = "Mission"
                    prize={prize}
                    onClose={() => setShowPrizeModal(false)}
                />
            )}
        </MainLayout>
    );
}
