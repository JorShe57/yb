import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Define the form schema with validation
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  city: z.string().min(2, { message: "City is required" }),
  address: z.string().min(5, { message: "Please enter a valid service address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }),
  service: z.string().min(1, { message: "Please select a service type" }),
  comments: z.string().optional(),
});

// Type definition for our form values
type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function QuoteForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      address: "",
      phone: "",
      service: "",
      comments: "",
    },
  });

  // Submit handler for FormSubmit
  function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    // Form submission will actually be handled by the FormSubmit action
    // Just showing a toast for better UX
    toast({
      title: "Validating your information",
      description: "Your form is being submitted...",
      variant: "default",
    });
  }

  return (
    <Form {...form}>
      <form 
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
            <input type="hidden" name="service" value={form.watch("service")} />
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
          <input type="hidden" name="comments" value={form.watch("comments") || ""} />
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