import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteForm } from "./quote-form-new";
import { SkeletonForm } from "@/components/ui/skeleton-loader";
import AnimatedSection from "./AnimatedSection";

export default function QuotesSection() {
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: false, amount: 0.2 });

  return (
    <AnimatedSection 
      id="quotes" 
      animation="from-bottom"
      className="py-20 bg-gradient-to-br from-background/80 to-background"
      showTransitionToNext={true}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Request a <span className="text-primary">Free Quote</span>
          </h2>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-card-foreground/10 shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div 
              ref={formRef} 
              className={`transition-all duration-700 ${
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              <QuoteForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
