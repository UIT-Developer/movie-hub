"use client";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  { src: "/top_banner1.jpg", alt: "Banner 1" },
  { src: "/top_banner2.jpg", alt: "Banner 2" },
];

export default function TopAdBanner() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg pt-0">
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
              <div className="relative w-full aspect-video">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !hidden md:!flex left-2 top-1/2 w-10 h-10 bg-[#181e2a] rounded-full items-center justify-center z-10 absolute cursor-pointer">
            <ArrowBigLeft size={20} className="text-white" />
          </div>
          <div className="swiper-button-next !hidden md:!flex right-2 top-1/2 w-10 h-10 bg-[#181e2a] rounded-full items-center justify-center z-10 absolute cursor-pointer">
            <ArrowBigRight size={20} className="text-white" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
