"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-6 lg:px-0 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo2.webp"
            alt="CineStar Logo"
            width={80}
            height={80}
            className="object-contain transition-transform duration-300 group-hover:scale-110 "
          />

        </Link>

        {/* Menu desktop */}
        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-6 font-medium text-white">
          {[
            { href: "/rap", label: "Chọn rạp" },
            { href: "/lich-chieu", label: "Lịch chiếu" },
            { href: "/uu-dai", label: "Ưu đãi" },
            { href: "/dich-vu", label: "Dịch vụ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group"
            >
              <span className="px-4 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 bg-transparent group-hover:bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 group-hover:text-black">
                {item.label}
              </span>
              {/* Optional underline effect */}
            </Link>
          ))}
        </nav>


        {/* Login/Register */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold text-white shadow-lg shadow-red-500/40 hover:scale-105 hover:shadow-red-500/70 transition"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 border-2 border-white/80 rounded-full font-semibold text-white hover:bg-white hover:text-black shadow-md hover:shadow-white/50 transition"
          >
            Đăng ký
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white hover:text-red-400 transition">
          <Menu size={30} />
        </button>
      </div>
    </header>
  );
}
