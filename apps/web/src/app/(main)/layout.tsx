import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col  overflow-x-hidden">
      <Navbar />
      <main className="w-full flex-1 px-6 md:px-16 lg:px-40 pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
