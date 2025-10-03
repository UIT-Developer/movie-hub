import Image from "next/image";

export default function PromoBanner() {
  const promos = [
    { name: "Khuyến mãi 1", image: "/promotion1.jpg" },
    { name: "Khuyến mãi 2", image: "/promotion2.jpg" },
    { name: "Khuyến mãi 3", image: "/promotion3.jpg" },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-sans font-bold mb-12 text-center uppercase">
        Khuyến mãi
      </h2>
      <div className="flex justify-center space-x-32">
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
