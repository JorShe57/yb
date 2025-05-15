import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import QuotesSection from "@/components/QuotesSection";
import ServicesSection from "@/components/ServicesSection";
import SodSection from "@/components/SodSection";
import CalculatorSection from "@/components/CalculatorSection";
import Footer from "@/components/Footer";
import ChatLauncher from "@/components/ChatLauncher";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground will-change-transform">
      <Header />
      <main className="flex-grow pt-16 overflow-hidden">
        <div className="content-wrapper relative">
          <HomeSection />
          <QuotesSection />
          <ServicesSection />
          <SodSection />
          <CalculatorSection />
        </div>
      </main>
      <Footer />
      <ChatLauncher />
      <ScrollToTop />
    </div>
  );
}
