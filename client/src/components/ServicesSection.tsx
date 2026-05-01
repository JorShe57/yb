import React from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
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
      image: "/images/premium-sod.png",
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
      className="py-20 bg-gradient-to-br from-background via-background to-secondary/5 relative overflow-hidden"
    >
      {/* Background circles decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mt-3 max-w-3xl text-foreground/80">
            From grading and drainage to new lawns and beds, we do the prep work right so your yard looks great and stays that way.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
              className="h-full"
            >
              <ServiceCard
                index={index}
                title={service.title}
                description={service.description}
                image={service.image}
                alt={service.alt}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button 
            asChild
            variant="accent"
            className="px-6 py-4 text-base shadow-lg"
          >
            <a href="#quotes">Book a Consultation</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
