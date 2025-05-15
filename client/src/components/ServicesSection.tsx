import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel-dots";

export default function ServicesSection() {
  // Detect mobile viewport for conditional rendering
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const services = [
    {
      title: "Site Preparation & Grading",
      description: "We level and grade your yard for perfect drainage and a smooth, even surface—getting the base just right before any new grass goes down.",
      image: "/images/site-preparation.png",
      alt: "Site Preparation & Grading"
    },
    {
      title: "Edging & Trimming",
      description: "Clean, crisp edges around sidewalks, driveways, and garden beds that enhance the overall appearance of your landscape.",
      image: "/images/edging.png",
      alt: "Edging & Trimming"
    },
    {
      title: "Premium Sod Installation",
      description: "Transform your yard with our high-quality sod varieties, professionally installed for immediate and lasting results.",
      image: "/images/premium-sod.png",
      alt: "Premium Sod Installation"
    },
    {
      title: "Fertilization & Soil Amendment",
      description: "We enhance your soil with custom fertilization programs and amendments to create the perfect growing environment for your landscape.",
      image: "/images/fertilization.png",
      alt: "Fertilization & Soil Amendment"
    },
    {
      title: "Old Turf Removal",
      description: "Our efficient turf removal services prepare your yard for a fresh start, eliminating old grass and weeds completely.",
      image: "/images/old-turf.png",
      alt: "Old Turf Removal"
    },
    {
      title: "Irrigation Consultation",
      description: "Get expert advice on water-efficient irrigation systems tailored to your landscape's specific needs.",
      image: "/images/irrigation.png",
      alt: "Irrigation Consultation"
    }
  ];
  
  return (
    <section 
      id="services" 
      className="py-20 bg-gradient-to-br from-background/80 to-background relative overflow-hidden"
    >
      {/* Background circles decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex items-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold relative inline-block">
            Our <span className="text-primary">Services</span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-accent/50 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
        </motion.div>
        
        <motion.p
          className="max-w-2xl mx-auto text-center mb-12 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We provide comprehensive landscaping services that transform your outdoor spaces with professional 
          care and attention to detail. Explore our offerings below.
        </motion.p>
        
        {/* Show carousel on mobile, grid on desktop */}
        {isMobile ? (
          <div className="mb-16">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-4 pr-4 basis-full sm:basis-4/5">
                    <div className="p-1 h-full flex flex-col">
                      <ServiceCard
                        key={index}
                        index={index}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                        alt={service.alt}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="relative static left-0 right-0 translate-x-0 bg-background border border-primary/20" />
                <CarouselNext className="relative static left-0 right-0 translate-x-0 bg-background border border-primary/20" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                index={index}
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
              />
            ))}
          </div>
        )}
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button 
            asChild
            variant="default" 
            className="bg-accent hover:bg-yellow-500 hover:text-white text-white px-6 py-4 text-base shadow-lg"
          >
            <a href="#quotes">Book a Consultation</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
