import React, {useState} from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';


export default function VoucherIndex ({ vouchers }) {
    const [activeTab, setActiveTab] = useState("vouchers");

    const currentDate = new Date();
    const activeVouchers = vouchers.filter(voucher => new Date(voucher.end_date) >= currentDate && voucher.status === "claimed");
    const expiredVouchers = vouchers.filter(voucher => new Date(voucher.end_date) < currentDate || voucher.status === "used");

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

                <div className='mt-4 bg-gray-300'>
                    {activeTab === 'vouchers' && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                            {activeVouchers.map((voucher) => {                        
                            return (
                                <div key={voucher.id} className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
                                <div className="flex justify-between items-center">
                                  <p className="text-gray-500 text-sm">Coupons</p>
                                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
                                    In-Store
                                  </span>
                                </div>
                                <div className="border-2 border-dashed border-yellow-500 rounded-lg p-4">
                                    <h2 className="text-2xl font-bold mt-2">{voucher.name}</h2>
                                    <p className="text-gray-500 text-sm">Valid for applicable products</p>
                            
                                    <p className="text-gray-400 text-xs mt-4">Expires {voucher.end_date}</p>
                                </div>
                                <div className='mt-auto'>
                                    <Link 
                                        href={`/vouchers/${voucher.id}`} 
                                        className="w-full mt-4 py-2 text-red-500 font-semibold border-2 border-dashed border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition text-center block"
                                    >
                                        Redeem
                                    </Link>
                                </div>
                              </div>
                            );
                            })}

                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {expiredVouchers.length === 0 ? (
                                <p className="text-gray-500">No expired vouchers yet.</p>
                            ) : (
                                expiredVouchers.map((voucher) => (
                                    <div key={voucher.id} className="bg-gray-100 rounded-2xl shadow-md p-4 border border-gray-200">
                                        <h2 className="text-xl font-bold mt-2">{voucher.name}</h2>
                                        <p className="text-gray-500 text-sm">
                                            {voucher.status === 'used' 
                                                ? `Used at ${voucher.used_at}` 
                                                : `Expired on ${voucher.end_date}`}
                                        </p>
                                        <span className={`font-semibold ${voucher.status === 'used' ? 'text-green-500' : 'text-red-500'}`}>
                                            {voucher.status === 'used' ? 'Used' : 'Expired'}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                </div>
            </div>   
        </MainLayout>
    );
}
