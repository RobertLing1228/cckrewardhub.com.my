import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function MultipleImages({ images, name }) {
    let imageList = [];

    if (Array.isArray(images)) {
        imageList = images;
    } else if (typeof images === "string") {
        try {
            imageList = JSON.parse(images);
        } catch (error) {
            console.error("Error parsing images:", images);
        }
    }

    return (
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto select-none overflow-hidden">  
            {/* Wrapper ensures Swiper stays in place */}
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-auto"
                style={{ maxWidth: "100%", height: "auto", zIndex: 0 }} // Ensures it doesn’t overlap navbar
            >
                {imageList.map((img, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img 
                            src={`/storage/${img}`} 
                            loading='lazy'
                            alt={`Product image ${name}`} 
                            className="w-full h-40 object-cover rounded-md"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
