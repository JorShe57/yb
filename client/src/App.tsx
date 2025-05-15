import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import AdminQuotes from "@/pages/admin/Quotes";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

// Add smooth scrolling to the whole app
function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  
  // Fix iOS 100vh issue
  useEffect(() => {
    const setVhVariable = () => {
      // Set the value of 1vh unit to the window height / 100
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set it on initial load
    setVhVariable();
    
    // Update on resize
    window.addEventListener('resize', setVhVariable);
    
    return () => window.removeEventListener('resize', setVhVariable);
  }, []);
  
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/quotes" component={AdminQuotes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScrollProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
