"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const banners = [
  { src: "/top_banner1.jpg", alt: "Banner 1" },
  { src: "/top_banner2.jpg", alt: "Banner 2" },
];

export default function TopAdBanner() {
  return (
  <div className="w-full max-w-7xl mx-auto mt-0 mb-6 rounded-2xl overflow-hidden shadow-lg pt-0">
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Navigation]}
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[320px] md:h-[480px] bg-black">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-center"
                  priority={idx === 0}
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !left-2 !top-1/2 !w-10 !h-10 !bg-[#181e2a] !rounded-full !flex !items-center !justify-center !z-10 !absolute cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </div>
          <div className="swiper-button-next !right-2 !top-1/2 !w-10 !h-10 !bg-[#181e2a] !rounded-full !flex !items-center !justify-center !z-10 !absolute cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
