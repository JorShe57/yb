// ServicesSection.tsx
import React from "react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function ServicesSection() {
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 });
  const services = [
    {
      title: "Site Preparation & Grading",
      description: "We level and grade your yard for perfect drainage and a smooth, even surface—getting the base just right before any new grass goes down.",
      image: "/images/site-preparation.png",
      alt: "Site Preparation & Grading",
      testimonial: {
        quote: "YardBros did an excellent job grading my sloped yard. No more water pooling issues!",
        name: "Robert T.",
        location: "Portland, OR",
        image: "/images/customers/customer1.png"
      }
    },
    {
      title: "Edging & Trimming",
      description: "Clean, crisp edges around sidewalks, driveways, and garden beds that enhance the overall appearance of your landscape.",
      image: "/images/edging.png",
      alt: "Edging & Trimming",
      testimonial: {
        quote: "The clean edges they created around my garden beds completely transformed the look of my yard.",
        name: "Sarah M.",
        location: "Seattle, WA",
        image: "/images/customers/customer2.png"
      }
    },
    {
      title: "Premium Sod Installation",
      description: "Transform your yard with our high-quality sod varieties, professionally installed for immediate and lasting results.",
      image: "/images/premium-sod.png",
      alt: "Premium Sod Installation",
      testimonial: {
        quote: "From dirt to gorgeous lawn in just one day! Their sod installation was flawless.",
        name: "Michael J.",
        location: "Vancouver, WA",
        image: "/images/customers/customer3.png"
      }
    },
    {
      title: "Fertilization & Soil Amendment",
      description: "We enhance your soil with custom fertilization programs and amendments to create the perfect growing environment for your landscape.",
      image: "/images/fertilization.png",
      alt: "Fertilization & Soil Amendment",
      testimonial: {
        quote: "My soil was basically clay until YardBros transformed it. Now everything I plant thrives!",
        name: "Jennifer K.",
        location: "Beaverton, OR",
        image: "/images/customers/customer4.png"
      }
    },
    {
      title: "Old Turf Removal",
      description: "Our efficient turf removal services prepare your yard for a fresh start, eliminating old grass and weeds completely.",
      image: "/images/old-turf.png",
      alt: "Old Turf Removal",
      testimonial: {
        quote: "They removed our patchy, weed-filled lawn quickly and thoroughly. Great preparation for our new landscaping.",
        name: "David L.",
        location: "Tigard, OR",
        image: "/images/customers/customer5.png"
      }
    },
    {
      title: "Irrigation Consultation",
      description: "Get expert advice on water-efficient irrigation systems tailored to your landscape's specific needs.",
      image: "/images/irrigation.png",
      alt: "Irrigation Consultation",
      testimonial: {
        quote: "Their irrigation recommendations saved us money on water bills while keeping our lawn perfectly watered.",
        name: "Amanda R.",
        location: "Lake Oswego, OR",
        image: "/images/customers/customer6.png"
      }
    }
  ];
  
  return (
    <AnimatedSection 
      id="services" 
      className="py-16 bg-gradient-to-br from-gray-50 to-neutral"
      animation="from-left"
      showTransitionToNext={true}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 animate-from-top" style={{ transitionDelay: '0.2s' }}>
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Our Services</h2>
        </div>
        
        <div 
          className="flex flex-wrap justify-center stagger-children animate-show"
          ref={cardsRef as React.RefObject<HTMLDivElement>}
        >
          {services.map((service, index) => (
            <div key={index} className="flip-card" tabIndex={0}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={service.image} alt={service.alt} />
                </div>
                <div className="flip-card-back">
                  <h3 className="text-lg font-medium text-primary mb-3">{service.title}</h3>
                  <p className="text-sm mb-4">{service.description}</p>
                  
                  {/* Customer Testimonial */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="italic text-sm text-gray-600 mb-3">"{service.testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={service.testimonial.image} 
                          alt={service.testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{service.testimonial.name}</p>
                        <p className="text-xs text-gray-500">{service.testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <a href="#quotes" className="mt-4 inline-block bg-accent hover:bg-yellow-500 text-dark font-medium py-2 px-4 rounded text-sm transition-colors">
                    Get a Quote
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-from-bottom" style={{ transitionDelay: '0.6s' }}>
          <a href="#quotes" className="bg-accent hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block shadow-lg">
            Book a Consultation
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
