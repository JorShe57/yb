import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import QuotesSection from "@/components/QuotesSection";
import ServicesSection from "@/components/ServicesSection";
import SodSection from "@/components/SodSection";
import CalculatorSection from "@/components/CalculatorSection";
import Footer from "@/components/Footer";
import ChatSection from "@/components/ChatLauncher"; // Still using the same file but different component name
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground will-change-transform">
      <ScrollIndicator height={4} />
      <Header />
      <main className="flex-grow pt-16 overflow-hidden">
        <div className="content-wrapper relative">
          <HomeSection />
          <QuotesSection />
          <ServicesSection />
          <SodSection />
          <ChatSection />
          <CalculatorSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
