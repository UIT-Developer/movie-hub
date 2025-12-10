import { getAllCinemas } from '../../libs/actions/cinemas/cinema-action';
import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const cinemas = await getAllCinemas();
  const cinemaOptions = cinemas.data.map((c) => ({
    id: c.id,
    name: c.name,
  }));
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col  overflow-x-hidden">
      <Navbar cinemas={cinemaOptions} />
      <main className="w-full flex-1 px-6 md:px-16 lg:px-40 pt-24  bg-gradient-to-b from-black via-rose-950/40 to-black">
        {children}
      </main>

      <Footer />
    </div>
  );
}
