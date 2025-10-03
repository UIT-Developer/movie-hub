import Image from "next/image";

export default function OtherServices() {
  const services = [
    { name: "Bowling", icon: "/icons/bowling.webp" },
    { name: "Cafe", icon: "/icons/cafe.jpg" },
    { name: "Kidzone", icon: "/icons/kidzone.webp" },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-sans font-bold  mb-12 text-center uppercase">
        Dịch vụ giải trí khác
      </h2>
      <div className="flex justify-center space-x-40">
        {services.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center transform transition duration-300 hover:scale-110"
          >
            <Image
              src={s.icon}
              alt={s.name}
              width={320}
              height={320}
              className="w-80 h-80 mb-8 rounded-2xl shadow-2xl object-cover"
            />
            <span className="text-3xl font-extrabold">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
