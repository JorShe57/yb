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
  
  // Submit handler for FormSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We're using basic validation
    e.preventDefault();
    
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const cityInput = form.elements.namedItem('city') as HTMLInputElement;
    const addressInput = form.elements.namedItem('address') as HTMLInputElement;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    const serviceInput = form.elements.namedItem('service') as HTMLSelectElement;
    
    // Basic validation before submission
    if (!nameInput.value) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      toast({
        title: "Valid Email Required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!cityInput.value) {
      toast({
        title: "City Required",
        description: "Please enter your city",
        variant: "destructive",
      });
      return;
    }
    
    if (!addressInput.value) {
      toast({
        title: "Address Required",
        description: "Please enter your service address",
        variant: "destructive",
      });
      return;
    }
    
    if (!phoneInput.value) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    if (!serviceInput.value) {
      toast({
        title: "Service Selection Required",
        description: "Please select a service type",
        variant: "destructive",
      });
      return;
    }
    
    // Form is valid, show submitting state
    setIsSubmitting(true);
    toast({
      title: "Submitting Your Request",
      description: "Please wait while we process your information...",
      variant: "default",
    });
    
    // Submit the form manually
    form.submit();
  };

  return (
    <Form {...form}>
      <form 
        ref={formRef}
        action="https://formsubmit.co/jorshevel@gmail.com" 
        method="POST" 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        {/* Hidden fields for FormSubmit configuration */}
        <input type="hidden" name="_subject" value="New Quote Request from YardBros Website" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={window.location.origin + window.location.pathname} />
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name field */}
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit - using id instead of name to avoid conflicts */}
            <input type="hidden" id="name_submit" name="name" value={form.watch("name")} />
          </div>

          {/* Email field */}
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit */}
            <input type="hidden" id="email_submit" name="email" value={form.watch("email")} />
          </div>

          {/* City field */}
          <div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit */}
            <input type="hidden" id="city_submit" name="city" value={form.watch("city")} />
          </div>

          {/* Address field */}
          <div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Address *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit */}
            <input type="hidden" id="address_submit" name="address" value={form.watch("address")} />
          </div>

          {/* Phone field */}
          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit */}
            <input type="hidden" id="phone_submit" name="phone" value={form.watch("phone")} />
          </div>

          {/* Service field */}
          <div>
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Interest *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background text-foreground/90 hover:bg-background data-[state=open]:bg-background focus:bg-background">
                        <SelectValue placeholder="Choose a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sod">Sod Installation</SelectItem>
                      <SelectItem value="landscaping">Landscaping</SelectItem>
                      <SelectItem value="maintenance">Yard Maintenance</SelectItem>
                      <SelectItem value="topsoil">Topsoil Delivery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Hidden field for FormSubmit */}
            <input type="hidden" id="service_submit" name="service" value={form.watch("service")} />
          </div>
        </div>

        {/* Comments field */}
        <div>
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us more about your project" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Hidden field for FormSubmit */}
          <input type="hidden" id="comments_submit" name="comments" value={form.watch("comments") || ""} />
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
    </Form>
  );
}