import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Placeholder for Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-midnight text-white">
          <div className="text-center">
            <h1 className="text-5xl font-heading font-bold mb-4">Hero Section</h1>
            <p className="text-gray-400">Section placeholder</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
