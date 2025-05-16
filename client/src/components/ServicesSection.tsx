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
  // Track active slide for indicators
  const [activeSlide, setActiveSlide] = useState(0);
  // Store carousel API reference
  const [carouselApi, setCarouselApi] = useState<any>(null);
  
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
  
  // Handle manual active slide changes by syncing with carousel
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(activeSlide);
    }
  }, [activeSlide, carouselApi]);
  const services = [
    {
      title: "Site Preparation & Grading",
      description: "We expertly level and grade your yard to ensure perfect water drainage and create a smooth, even surface—the essential foundation before installing any new lawn.",
      image: "/images/site-preparation.png",
      alt: "Site Preparation & Grading"
    },
    {
      title: "New Lawn Install: Sod or Seed",
      description: "Transform your yard with premium sod installation for instant results or professional seeding for a more economical option. We select the perfect grass varieties for your specific soil and sun conditions.",
      image: "/images/sod-installation-poster.jpg",
      alt: "New Lawn Installation"
    },
    {
      title: "Aerating and Overseeding",
      description: "Rejuvenate your existing lawn with our core aeration service that allows air, water and nutrients to penetrate the soil, followed by overseeding to fill in thin areas and enhance thickness.",
      image: "/images/services/aeration.png",
      alt: "Aerating and Overseeding"
    },
    {
      title: "Dethatching",
      description: "Remove the layer of dead grass and debris that builds up between the soil and the green vegetation of your lawn. Our dethatching service improves lawn health by increasing air flow and nutrient absorption.",
      image: "/images/services/detach.png",
      alt: "Dethatching Services"
    },
    {
      title: "Old Turf Removal",
      description: "Starting fresh? We'll efficiently remove your old, damaged lawn to prepare for new installation. Our specialized equipment ensures complete removal of old grass and roots for a clean slate.",
      image: "/images/old-turf.png",
      alt: "Old Turf Removal"
    },
    {
      title: "Patios and Concrete",
      description: "Enhance your outdoor living space with custom patios, walkways, and concrete work. Our skilled team creates beautiful, durable hardscaping elements that complement your landscape.",
      image: "/images/services/patio.png",
      alt: "Patios and Concrete"
    },
    {
      title: "Bed Creation and Mulching",
      description: "Define your landscape with professionally designed garden beds, complete with premium mulch installation that suppresses weeds, retains moisture, and gives your property a polished, finished look.",
      image: "/images/services/Beds.png",
      alt: "Bed Creation and Mulching"
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
        
        {/* Services Carousel for all screen sizes */}
        <div className="mb-16">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
            setApi={(api) => {
              // Set up callback to update active slide index
              api?.on("select", () => {
                setActiveSlide(api.selectedScrollSnap());
              });
              // Store API reference for dot navigation
              setCarouselApi(api);
            }}
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 pr-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                >
                  <motion.div 
                    className="p-1 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.2, 0.65, 0.3, 0.9] 
                    }}
                  >
                    <ServiceCard
                      key={index}
                      index={index}
                      title={service.title}
                      description={service.description}
                      image={service.image}
                      alt={service.alt}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="relative static left-0 right-0 translate-x-0 bg-background border border-primary/20 hover:bg-primary hover:text-white transition-colors" />
              <CarouselNext className="relative static left-0 right-0 translate-x-0 bg-background border border-primary/20 hover:bg-primary hover:text-white transition-colors" />
            </div>
            
            {/* Indicator dots using the CarouselDots component */}
            <CarouselDots 
              count={services.length} 
              activeIndex={activeSlide} 
              onDotClick={(index) => carouselApi?.scrollTo(index)}
              className="mt-4"
            />
          </Carousel>
        </div>
        
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
