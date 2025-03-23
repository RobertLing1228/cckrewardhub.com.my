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
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                            {vouchers.map((voucher) => (
                                <div key={voucher.id} className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
                                <div className="flex justify-between items-center">
                                  <p className="text-gray-500 text-sm">Coupons</p>
                                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
                                    In-Store
                                  </span>
                                </div>
                          
                                <h2 className="text-2xl font-bold mt-2">{voucher.name}</h2>
                                <p className="text-gray-500 text-sm">Valid for applicable products</p>
                          
                                <p className="text-gray-400 text-xs mt-4">Expires {voucher.end_date}</p>
                          
                                <button className="w-full mt-4 py-2 text-red-500 font-semibold border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                                  Use
                                </button>
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
