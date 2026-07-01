import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { ScrollytellingSection } from "@/components/sections/ScrollytellingSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

export default function Home() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <ScrollytellingSection />
        <SpecsSection />
        <OrderSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
