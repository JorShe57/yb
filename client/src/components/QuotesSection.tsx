import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteForm } from "./quote-form";
import { SkeletonForm } from "@/components/ui/skeleton-loader";
import AnimatedSection from "./AnimatedSection";

export default function QuotesSection() {
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: false, amount: 0.2 });

  return (
    <AnimatedSection 
      id="quotes" 
      animation="from-bottom"
      className="py-20 bg-gradient-to-br from-background to-muted/50"
      showTransitionToNext={true}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">
            Request a quote
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us what you’re working on, we’ll reply with a clear estimate and next steps.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-border/60 shadow-xl">
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
