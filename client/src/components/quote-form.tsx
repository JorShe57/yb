import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
// EmailJS removed - using webhook approach for notifications

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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

// Helper function to format service names
function formatServiceName(service: string): string {
  const serviceMap: Record<string, string> = {
    'sod': 'Sod Installation',
    'landscaping': 'Landscaping', 
    'maintenance': 'Yard Maintenance',
    'topsoil': 'Topsoil Delivery',
    'other': 'Other Services'
  };
  
  return serviceMap[service] || service;
}

export function QuoteForm() {
  const { toast } = useToast();
  
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

  // Handle form submission - send to API (which forwards to n8n)
  const quoteRequestMutation = useMutation({
    mutationFn: async (data: QuoteFormValues) => {
      return await apiRequest("POST", "/api/quotes", {
        ...data,
        service: formatServiceName(data.service),
        submitted_date: new Date().toLocaleString(),
      });
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Received",
        description: "Thank you for your request. We'll contact you shortly!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error: any) => {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Submission Failed", 
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    },
  });



  // Submit handler
  function onSubmit(data: QuoteFormValues) {
    quoteRequestMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            Typical reply time is within 24 hours. If you’re on a tight timeline, include it in the comments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormDescription>So we know what to call you.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" {...field} />
                </FormControl>
                <FormDescription>We’ll send your estimate here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service address</FormLabel>
                <FormControl>
                  <Input placeholder="Where service is needed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" type="tel" {...field} />
                </FormControl>
                <FormDescription>Optional, but helps us reach you faster.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background text-foreground hover:bg-background data-[state=open]:bg-background focus:bg-background">
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
                <FormDescription>Pick the closest match, we’ll confirm details after.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Comments</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us more about your project" rows={4} {...field} />
              </FormControl>
              <FormDescription>Timeline, measurements, photos, anything helpful.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            By submitting, you agree we can contact you about this request.
          </p>
          <Button 
            type="submit" 
            variant="accent"
            disabled={quoteRequestMutation.isPending}
            className="min-w-[180px]"
          >
            {quoteRequestMutation.isPending ? (
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