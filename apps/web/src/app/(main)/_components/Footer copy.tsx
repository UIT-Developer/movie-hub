import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Cột 1: Logo + Giới thiệu */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 justify-center">
            🎬 Cinema
          </h2>
          <p className="text-gray-400">
            Rạp chiếu phim chất lượng cao với trải nghiệm âm thanh và hình ảnh sống động.
            Đặt vé nhanh chóng, dễ dàng và tiện lợi trên mọi thiết bị.
          </p>

          {/* Social icons */}
          <div className="flex items-center mt-4 space-x-4">
            <a href="#" className="hover:text-red-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-white font-semibold text-xl mb-4">Liên kết nhanh</h3>
          <ul className="space-y-3 text-center">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors duration-300">Trang chủ</Link>
            </li>
            <li>
              <Link href="/schedule" className="hover:text-red-500 transition-colors duration-300">Lịch chiếu</Link>
            </li>
            <li>
              <Link href="/promotions" className="hover:text-red-500 transition-colors duration-300">Khuyến mãi</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500 transition-colors duration-300">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-white font-semibold text-xl mb-4">Liên hệ</h3>
          <p className="flex items-center gap-2 justify-center"><span>📍</span> 123 Đường ABC, Quận 1, TP.HCM</p>
          <p className="flex items-center gap-2 mt-2 justify-center"><span>📞</span> 0123 456 789</p>
          <p className="flex items-center gap-2 mt-2 justify-center"><span>✉️</span> contact@cinema.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2025 Rạp Chiếu Phim Next.js. All rights reserved.
      </div>
    </footer>
  );
}
