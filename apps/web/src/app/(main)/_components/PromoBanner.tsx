import { BlurCircle } from "apps/web/src/components/blur-circle";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  const promos = [
    { name: "Khuyến mãi 1", image: "/promotion1.jpg" },
    { name: "Khuyến mãi 2", image: "/promotion2.jpg" },
    { name: "Khuyến mãi 3", image: "/promotion3.jpg" },
  ];

  return (
    <section className="px-6 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-gray-300 font-bold text-lg">Khuyến mãi</p>

        <Link
          href="/discounts"
          className="relative z-10 group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          Xem tất cả
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </Link>
      </div>

      <div className="flex justify-center gap-x-4">
        {promos.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center transform transition duration-300 hover:scale-110"
          >
            <div className="relative w-85 h-85 mb-8 rounded-2xl shadow-2xl overflow-hidden bg-black">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold">{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
