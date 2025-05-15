import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import AdminQuotes from "@/pages/admin/Quotes";

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
  // Use our smooth scroll hook to improve navigation
  useSmoothScroll(80); // 80px offset for the fixed header

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
