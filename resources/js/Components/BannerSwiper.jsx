import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "@inertiajs/react";

export default function BannerSwiper({ banners }) {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mb-8 rounded-xl overflow-hidden shadow-md"
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <Link href={banner.link || "#"}>
                    <img
                        src={`/storage/${banner.image_path}`}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
/>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


