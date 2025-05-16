import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function QuoteForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Basic form validation before submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
    const serviceInput = form.querySelector('select[name="service"]') as HTMLSelectElement;
    
    if (!nameInput?.value) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!emailInput?.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      toast({
        title: "Valid Email Required", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!phoneInput?.value) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    if (!serviceInput?.value) {
      toast({
        title: "Service Selection Required",
        description: "Please select a service type",
        variant: "destructive",
      });
      return;
    }
    
    // Form is valid, show a toast and submit
    setIsSubmitting(true);
    toast({
      title: "Submitting Your Request",
      description: "Please wait while we process your information...",
      variant: "default",
    });
    
    // Submit the form
    form.submit();
  };

  return (
    <form 
      action="https://formsubmit.co/jorshevel@gmail.com" 
      method="POST" 
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      {/* Hidden fields for FormSubmit configuration */}
      <input type="hidden" name="_subject" value="New Quote Request from YardBros Website" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={window.location.href} />
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name field */}
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your full name" required />
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
        </div>

        {/* City field */}
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" name="city" placeholder="Your city" required />
        </div>

        {/* Address field */}
        <div className="space-y-2">
          <Label htmlFor="address">Service Address *</Label>
          <Input id="address" name="address" placeholder="Where service is needed" required />
        </div>

        {/* Phone field */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
        </div>

        {/* Service field */}
        <div className="space-y-2">
          <Label htmlFor="service">Service Interest *</Label>
          <select
            id="service"
            name="service"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Choose a service type</option>
            <option value="sod">Sod Installation</option>
            <option value="landscaping">Landscaping</option>
            <option value="maintenance">Yard Maintenance</option>
            <option value="topsoil">Topsoil Delivery</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Comments field */}
      <div className="space-y-2">
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea 
          id="comments" 
          name="comments" 
          placeholder="Tell us more about your project" 
          rows={4}
        />
      </div>

      <div className="text-right">
        <Button 
          type="submit" 
          variant="accent"
          disabled={isSubmitting}
          className="min-w-[180px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Submit Quote Request'
          )}
        </Button>
      </div>
    </form>
  );
}