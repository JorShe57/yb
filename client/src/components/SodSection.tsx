import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { SodCard } from '@/components/ui/sod-card';

export default function SodSection() {
  const sodTypes = [
    {
      name: "YardBros SunGold Blend",
      description: "Our Kentucky Bluegrass and Ryegrass blend creates the perfect turf for high-visibility areas with full sun exposure. This low-maintenance premium blend delivers a vibrant, lush appearance.",
      image: "/images/sungold-lawn.png",
      features: [
        { label: "Sun Exposure", value: "Full Sun" },
        { label: "Water Requirements", value: "Moderate" },
        { label: "Maintenance Level", value: "Low" },
        { label: "Drought Resistance", value: "Moderate" },
        { label: "Traffic Tolerance", value: "High" },
        { label: "Texture", value: "Soft, Luxurious" }
      ],
      whenToUse: [
        "High-Visibility Areas: Use SunGold sod in front yards or areas visible to visitors for its lush and vibrant appearance.",
        "Full Sun: It thrives in full sunlight conditions, making it perfect for sunny spots in your landscape.",
        "Minimal Maintenance: Requires less watering and maintenance compared to other sod types."
      ],
      benefits: [
        "Disease Resistance: Known for its resilience against common lawn diseases.",
        "Soft Texture: Provides a soft, comfortable feel underfoot."
      ]
    },
    {
      name: "YardBros Cool Shade Blend",
      description: "Our Fescue and Bluegrass blend is specially developed for shaded areas and cooler climates. This versatile sod thrives in partial shade and performs exceptionally well in various soil conditions.",
      image: "/images/coolshade-lawn.png",
      features: [
        { label: "Sun Exposure", value: "Partial to Full Shade" },
        { label: "Water Requirements", value: "Low to Moderate" },
        { label: "Maintenance Level", value: "Low" },
        { label: "Drought Resistance", value: "High" },
        { label: "Traffic Tolerance", value: "Medium" },
        { label: "Texture", value: "Medium-Fine" }
      ],
      whenToUse: [
        "Shaded Areas: Thrives in areas with partial shade or dappled sunlight, making it ideal for backyards under trees or shaded corners.",
        "Cooler Climates: Performs well in cooler temperatures and retains its green color throughout the year.",
        "Versatility: Suitable for a wide range of soil types and requires minimal watering once established."
      ],
      benefits: [
        "Drought Tolerance: Maintains its color and vigor during dry spells.",
        "Erosion Control: Helps prevent soil erosion due to its deep-rooted nature."
      ]
    }
  ];

  return (
    <section 
      id="sod" 
      className="py-20 bg-gradient-to-tr from-background/80 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#home" className="text-primary hover:text-secondary mr-3 transition-colors" aria-label="Go back to home">
            <ArrowLeft className="h-5 w-5" />
          </a>
          <h2 className="text-3xl md:text-4xl font-heading font-bold relative inline-block">
            Our <span className="text-primary">Sod</span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-accent/50 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-lg text-foreground/90 max-w-4xl">
            YardBros Landscaping offers two premium sod blends, carefully developed to thrive in different 
            conditions. Our sod is freshly harvested, delivered directly to your location, and professionally 
            installed for immediate curb appeal.
          </p>

          <div className="flex items-center mt-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="text-primary mr-3">
              <Shield className="h-6 w-6" />
            </div>
            <p className="text-sm text-foreground/80">
              All YardBros sod varieties are backed by our 30-day establishment guarantee
              and include a complimentary post-installation care guide.
            </p>
          </div>
        </motion.div>

        {/* Sod Cards */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-heading font-semibold mb-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Choose The Perfect Blend For Your Yard
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {sodTypes.map((sod, index) => (
              <SodCard 
                key={index}
                index={index}
                name={sod.name}
                description={sod.description}
                image={sod.image}
                features={sod.features}
                whenToUse={sod.whenToUse}
                benefits={sod.benefits}
              />
            ))}
          </div>
        </div>

        {/* Installation Process with Video */}
        <motion.div 
          className="mb-16 bg-card rounded-xl shadow-md overflow-hidden border border-border"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-xl font-heading font-bold text-primary p-6 border-b border-border bg-muted/30">
            Our Installation Process
          </h3>

          {/* Process Video */}
          <div className="relative overflow-hidden aspect-video">
            <video 
              className="w-full h-full object-cover" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/sodding-process-new2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
              <p className="text-white text-center p-4 font-medium text-lg">
                How We Do It
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1: Site Preparation */}
              <div className="flex flex-col bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                <div className="relative h-36 overflow-hidden">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/videos/site-preparation-new.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    1
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">Site Preparation</h4>
                  <p className="text-sm text-foreground/70">
                    Removal of old turf and debris, soil grading and amendment
                  </p>
                </div>
              </div>

              {/* Step 2: Sod Installation */}
              <div className="flex flex-col bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                <div className="relative h-36 overflow-hidden">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/videos/sod-installation-new2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    2
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">Sod Installation</h4>
                  <p className="text-sm text-foreground/70">
                    Precision cutting and seam-free placement of fresh sod
                  </p>
                </div>
              </div>

              {/* Step 3: Rolling & Watering */}
              <div className="flex flex-col bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                <div className="relative h-36 overflow-hidden">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/videos/rolling-watering-new.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    3
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">Rolling & Watering</h4>
                  <p className="text-sm text-foreground/70">
                    Ensuring proper soil contact and initial moisture for establishment
                  </p>
                </div>
              </div>

              {/* Step 4: Final Inspection */}
              <div className="flex flex-col bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                <div className="relative h-36 overflow-hidden">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/videos/final-inspection-new.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    4
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">Final Inspection</h4>
                  <p className="text-sm text-foreground/70">
                    Quality check and care instructions for proper establishment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section - Optimized for Mobile */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-heading font-semibold mb-6 text-center md:text-left">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <motion.div 
              className="bg-card p-5 rounded-xl shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h4 className="font-medium text-lg mb-2">How soon can I walk on my new sod?</h4>
              <p className="text-foreground/80">
                You can walk on your new sod immediately after installation when necessary, but we recommend 
                limiting foot traffic for the first 2-3 weeks while the roots establish. After about 3 weeks, 
                your sod should be firmly rooted.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div 
              className="bg-card p-5 rounded-xl shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h4 className="font-medium text-lg mb-2">How often should I water my new sod?</h4>
              <p className="text-foreground/80">
                For the first 2 weeks, water your new sod 2-3 times daily (morning, noon, and early evening) 
                for about 15-20 minutes each session. After 2 weeks, reduce to once daily for 30 minutes for 
                another week, then transition to your normal watering schedule.
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div 
              className="bg-card p-5 rounded-xl shadow-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <h4 className="font-medium text-lg mb-2">When should I first mow my new sod?</h4>
              <p className="text-foreground/80">
                Wait until your sod is firmly rooted and about 3-4 inches tall, typically 2-3 weeks after 
                installation. For the first mow, set your mower to a higher setting and remove no more than 
                1/3 of the blade length. Never mow wet sod.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a 
            href="#quotes" 
            className="bg-accent hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-block shadow-lg text-lg"
          >
            Request Sod Installation
          </a>
        </motion.div>
      </div>
    </section>
  );
}