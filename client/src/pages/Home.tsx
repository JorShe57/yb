import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import QuotesSection from "@/components/QuotesSection";
import ServicesSection from "@/components/ServicesSection";
import SodSection from "@/components/SodSection";
import CalculatorSection from "@/components/CalculatorSection";
import Footer from "@/components/Footer";
import ChatLauncher from "@/components/ChatLauncher";
import { SectionIndicator } from "@/components/ui/section-indicator";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useEffect } from "react";

export default function Home() {
  // Add overscroll color to match the background
  useEffect(() => {
    // Apply overscroll color that matches the theme
    document.documentElement.style.backgroundColor = 'var(--background)';
    
    // Prevent bounce/overscroll on iOS with a CSS class instead
    document.body.classList.add('mobile-touch-scroll');
    
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.classList.remove('mobile-touch-scroll');
    };
  }, []);

  // Define sections for the indicator
  const sections = [
    { id: "home", label: "Home" },
    { id: "quotes", label: "Get a Quote" },
    { id: "services", label: "Services" },
    { id: "sod", label: "Sod Options" },
    { id: "calculator", label: "Calculator" }
  ];

  return (
    <div className="min-h-screen-safe flex flex-col font-body bg-background text-foreground">
      <Header />
      <main className="flex-grow pt-16">
        <HomeSection />
        <QuotesSection />
        <ServicesSection />
        <SodSection />
        <CalculatorSection />
      </main>
      <Footer />
      <ChatLauncher />
      <SectionIndicator sections={sections} />
      {/* Temporarily disabled until we fix the hook issue */}
      {/* <PullToRefresh /> */}
    </div>
  );
}
