import React, {useState} from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';


export default function VoucherIndex ({ vouchers }) {
    const [activeTab, setActiveTab] = useState("vouchers");


    return (
        <MainLayout>
            <Head title="Promotions" />

            <div className='container mx-auto p-4'>
                <div className="flex border-b border-gray-200">
                    <button className={`px-4 py-2 text-base font-medium ${
                        activeTab === 'vouchers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('vouchers')}
                    >Vouchers</button>
                    <button className={`px-4 py-2 text-base font-medium ${
                        activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('history')}
                    >History</button>
                </div>

                <div className='mt-4'>
                    {activeTab === 'vouchers' && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {vouchers.map((voucher) => (
                                <div key={voucher.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-gray-800">{voucher.name}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{voucher.date_issued}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            <h3>History here</h3>
                        </div>
                    )}
                    
                </div>
            </div>   
        </MainLayout>
    );
}
