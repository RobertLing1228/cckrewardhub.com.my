import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "@inertiajs/react";
import MultipleImages from "./MultipleImages";

export default function HotItemsSwiper({ products }) {
    const prevPage = window.location.href;
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2">🔥 Hot Items</h2>
            <Swiper
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                pagination={false}
                navigation={false}
            >
                {products.map(product => (
                    <SwiperSlide key={product.productID}>
                        <Link
<<<<<<< Updated upstream
                            href={`/products/${product.productID}?prev=${encodeURIComponent(prevPage)}`}
=======
                            href={`/products/${product.productID}`}
>>>>>>> Stashed changes
                            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden block"
                        >
                            <div className="p-4">
                                <MultipleImages images={product.image} name={product.name} />
                                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                                    {product.name}
                                </h3>
                                <p className="text-red-600 font-bold mt-1">RM{product.price}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

