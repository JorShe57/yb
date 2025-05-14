import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import QuotesSection from "@/components/QuotesSection";
import ServicesSection from "@/components/ServicesSection";
import SodSection from "@/components/SodSection";
import CalculatorSection from "@/components/CalculatorSection";
import Footer from "@/components/Footer";
import ChatLauncher from "@/components/ChatLauncher";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body bg-neutral text-darkText">
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
    </div>
  );
}
