import React, { useEffect, useRef, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";


export default function Test() {
    return (
        <MainLayout>
            <div className="flex flex-col items-center space-y-4 p-4">
                {/* Mission 1 */}
                <div className="w-full max-w-md bg-fuchsia-500 rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-3  gap-4">
                    <div className="p-2 bg-fuchsia-900 rounded-xl text-5xl sm:text-7xl text-center flex items-center justify-center text-white font-bold">
                        0/3
                    </div>
                    <div className="p-2 bg-fuchsia-800 rounded-xl col-span-2 font-bold text-lg sm:text-xl">
                        Mission Name
                    </div>
                    <div className="p-2 bg-fuchsia-700 rounded-xl col-span-2">
                        Mission Description
                    </div>
                    </div>
                </div>

                {/* Mission 2 */}
                <div className="w-full max-w-md bg-fuchsia-500 rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="p-2 bg-fuchsia-900 rounded-xl text-5xl sm:text-7xl text-center flex items-center justify-center text-white font-bold">
                        0/1
                    </div>
                    <div className="p-2 bg-fuchsia-800 rounded-xl col-span-2 font-bold text-lg sm:text-xl">
                        Mission Name
                    </div>
                    <div className="p-2 bg-fuchsia-700 rounded-xl col-span-2">
                        Mission Description
                    </div>
                    </div>
                </div>

                {/* Mission 3 */}
                <div className="w-full max-w-md bg-fuchsia-500 rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="p-2 bg-fuchsia-900 rounded-xl text-5xl sm:text-7xl text-center flex items-center justify-center text-white font-bold">
                        0/1
                    </div>
                    <div className="p-2 bg-fuchsia-800 rounded-xl col-span-2 font-bold text-lg sm:text-xl">
                        Mission Name
                    </div>
                    <div className="p-2 bg-fuchsia-700 rounded-xl col-span-2">
                        Mission Description
                    </div>
                    </div>
                </div>
            </div>

            
            
        </MainLayout>
    );
};