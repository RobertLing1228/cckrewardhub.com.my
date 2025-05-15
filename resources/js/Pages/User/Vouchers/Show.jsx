import React, {useState, useEffect} from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Barcode from 'react-barcode';

export default function ShowVoucher({voucher}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update time every second
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const formattedTime = currentTime.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    }).replace(',', '');

    const handleMarkAsUsed = () => {
        router.post(`/vouchers/${voucher.id}/mark-as-used`, {}, {
            onSuccess: () => "", // Update state after success
        });
    };


    return (
        <MainLayout>
            <Head title={voucher.name} />
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {/* Back Button */}
                    <Link
                        href="/vouchers"
                        className="inline-block mb-4 text-blue-500 hover:text-blue-700"
                    >
                        &larr; Back to Vouchers
                    </Link>

                    <div className="flex items-center justify-center text-gray-600 text-sm font-semibold mt-4">
                        <span>{formattedTime}</span>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-sm">Coupons</p>
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
                            In-Store
                            </span>
                        </div>


                        <div className="flex justify-between items-center">
                            <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-md">
                            Valid Until {voucher.end_date}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{voucher.name}</h1>

                        <p className="text-gray-600 mb-6">RM{voucher.discount_value}</p>
                        <div className='text-center'>
                            <h1 className="text-md font-bold text-gray-800 mb-2">Promo Code</h1>
                            <Barcode 
                                value={voucher.code} 
                                width={2} 
                                height={100} 
                                format="CODE128"
                                displayValue={true}
                                fontOptions=""
                                font="monospace"
                                textAlign="center"
                                textPosition="bottom"
                                textMargin={2}
                                fontSize={12}  // Reduced font size
                                background="#ffffff"
                                lineColor="#000000"
                                margin={10}
                                className="w-full" // Makes it full width
                            />
                        </div>

                        <div className='text-center'>
                            <p className="text-sm text-gray-600 mb-4 ">Show your barcode to let the employee scan.</p>
                        </div>
                        
                        <button 
                            onClick={handleMarkAsUsed}
                            className="w-full py-2 font-bold rounded-lg transition bg-blue-500 hover:bg-blue-700 text-white mt-8"
                        >
                            Mark as Used
                        </button>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
}