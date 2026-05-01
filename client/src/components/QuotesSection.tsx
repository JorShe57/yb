import { Card, CardContent } from "@/components/ui/card";
import { QuoteForm } from "./quote-form";
import { SkeletonForm } from "@/components/ui/skeleton-loader";

export default function QuotesSection() {
  return (
    <section
      id="quotes"
      className="py-20 bg-gradient-to-br from-secondary/10 via-background to-accent/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight">
            Request a quote
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us what you’re working on, we’ll reply with a clear estimate and next steps.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-card/90 backdrop-blur-sm border-border/60 shadow-xl">
          <CardContent className="p-6 md:p-8">
            <QuoteForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
