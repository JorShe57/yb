import { useState } from "react";

export default function QuotesSection() {
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
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message and reset form
    setSubmitted(true);
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
  };
  
  return (
    <section id="quotes" className="section-fade py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Request a Free Quote</h2>
        </div>
        
        <div className="max-w-2xl mx-auto bg-neutral p-6 rounded-lg shadow-md">
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">Thank you for your quote request! We will contact you shortly.</span>
            </div>
          ) : null}
          
          <form id="quoteForm" className="space-y-6" onSubmit={handleSubmit}>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            
            <div className="text-right">
              <button 
                type="submit" 
                className="bg-primary hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Submit Quote Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
