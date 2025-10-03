import Image from "next/image";

export default function OtherServices() {
  const services = [
    { name: "Bowling", icon: "/icons/bowling.webp" },
    { name: "Cafe", icon: "/icons/cafe.jpg" },
    { name: "Kidzone", icon: "/icons/kidzone.webp" },
  ];

  return (
    <section className="px-6 overflow-hidden">
      <p className="text-gray-300 font-bold text-lg mb-4">Dịch vụ khác</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 ">
        {services.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center transform transition duration-300 hover:scale-110"
          >
            <Image
              src={s.icon}
              alt={s.name}
              width={200}
              height={200}
              className="w-80 h-80 mb-8 rounded-2xl shadow-2xl object-cover"
            />
            <span className="text-3xl font-extrabold">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
