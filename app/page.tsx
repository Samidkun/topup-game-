import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import GameSelection from "@/components/GameSelection";
import Promo from "@/components/Promo";
import HowToTopUp from "@/components/HowToTopUp";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <GameSelection />
      <Promo />
      <HowToTopUp />
      <FAQ />
      <Footer />
    </main>
  );
}
