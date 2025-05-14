import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function QuotesSection() {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
    phone: "",
    service: "",
    comments: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  // Use React Query mutation for submitting the form
  const quoteRequestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/quotes", data);
    },
    onSuccess: () => {
      // Show success message and reset form
      setSubmitted(true);
      setSubmitError("");
      
      // Reset form data
      setFormData({
        name: "",
        email: "",
        city: "",
        address: "",
        phone: "",
        service: "",
        comments: ""
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error submitting quote request:", error);
      setSubmitError("Failed to submit your request. Please try again later.");
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.city || !formData.address || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Submit the form data using the mutation
    quoteRequestMutation.mutate(formData);
  };
  
  return (
    <AnimatedSection 
      id="quotes" 
      animation="from-bottom"
      className="py-16 bg-gradient-to-br from-gray-100 to-neutral"
      showTransitionToNext={true}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 animate-from-left" style={{ transitionDelay: '0.3s' }}>
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Request a Free Quote</h2>
        </div>
        
        <div className="max-w-2xl mx-auto bg-neutral p-6 rounded-lg shadow-md">
          {/* Success message */}
          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">Thank you for your quote request! We will contact you shortly.</span>
            </div>
          )}
          
          {/* Error message */}
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{submitError}</span>
            </div>
          )}
          
          <form 
            id="quoteForm" 
            className="space-y-6 animate-show"
            ref={formRef as React.RefObject<HTMLFormElement>}
            onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2">City *</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  required 
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold mb-2">Service Address *</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange}
                  required 
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-semibold mb-2">Service Interest</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  disabled={quoteRequestMutation.isPending}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a service</option>
                  <option value="sod">Sod Installation</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="maintenance">Yard Maintenance</option>
                  <option value="topsoil">Topsoil Delivery</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="comments" className="block text-sm font-semibold mb-2">Additional Comments</label>
              <textarea 
                id="comments" 
                name="comments" 
                rows={4} 
                value={formData.comments}
                onChange={handleChange}
                disabled={quoteRequestMutation.isPending}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            
            <div className="text-right">
              <button 
                type="submit" 
                disabled={quoteRequestMutation.isPending}
                className={`${
                  quoteRequestMutation.isPending ? 'bg-gray-400' : 'bg-primary hover:bg-green-700'
                } text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center ml-auto`}
              >
                {quoteRequestMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit Quote Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
