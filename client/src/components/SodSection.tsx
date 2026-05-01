import React from "react";
import { motion } from "framer-motion";
import { Shield, Sprout, Droplets, Clock, ChevronDown } from "lucide-react";
import { SodCard } from "@/components/ui/sod-card";

export default function SodSection() {
  const sodTypes = [
    {
      name: "YardBros SunGold Blend",
      description:
        "Our Kentucky Bluegrass and Ryegrass blend creates the perfect turf for high-visibility areas with full sun exposure. This low-maintenance premium blend delivers a vibrant, lush appearance.",
      image: "/images/sungold-lawn.png",
      features: [
        { label: "Sun Exposure", value: "Full Sun" },
        { label: "Water Requirements", value: "Moderate" },
        { label: "Maintenance Level", value: "Low" },
        { label: "Drought Resistance", value: "Moderate" },
        { label: "Traffic Tolerance", value: "High" },
        { label: "Texture", value: "Soft, Luxurious" },
      ],
      whenToUse: [
        "High-Visibility Areas: Use SunGold sod in front yards or areas visible to visitors for its lush and vibrant appearance.",
        "Full Sun: It thrives in full sunlight conditions, making it perfect for sunny spots in your landscape.",
        "Minimal Maintenance: Requires less watering and maintenance compared to other sod types.",
      ],
      benefits: [
        "Disease Resistance: Known for its resilience against common lawn diseases.",
        "Soft Texture: Provides a soft, comfortable feel underfoot.",
      ],
    },
    {
      name: "YardBros Cool Shade Blend",
      description:
        "Our Fescue and Bluegrass blend is specially developed for shaded areas and cooler climates. This versatile sod thrives in partial shade and performs exceptionally well in various soil conditions.",
      image: "/images/coolshade-lawn.png",
      features: [
        { label: "Sun Exposure", value: "Partial to Full Shade" },
        { label: "Water Requirements", value: "Low to Moderate" },
        { label: "Maintenance Level", value: "Low" },
        { label: "Drought Resistance", value: "High" },
        { label: "Traffic Tolerance", value: "Medium" },
        { label: "Texture", value: "Medium-Fine" },
      ],
      whenToUse: [
        "Shaded Areas: Thrives in areas with partial shade or dappled sunlight, making it ideal for backyards under trees or shaded corners.",
        "Cooler Climates: Performs well in cooler temperatures and retains its green color throughout the year.",
        "Versatility: Suitable for a wide range of soil types and requires minimal watering once established.",
      ],
      benefits: [
        "Drought Tolerance: Maintains its color and vigor during dry spells.",
        "Erosion Control: Helps prevent soil erosion due to its deep-rooted nature.",
      ],
    },
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
            Two premium blends, cut fresh and installed with the prep work that makes sod last:
            grading, soil conditioning, clean seams, and a real watering plan.
          </p>

          <div className="mt-6 rounded-2xl border border-secondary/20 bg-gradient-to-r from-secondary/10 via-card/70 to-card/70 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-secondary/15 p-2 text-secondary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl">
                    30‑Day Establishment Guarantee
                  </h3>
                  <p className="mt-1 text-sm text-foreground/80 max-w-xl">
                    Follow our care guide and watering schedule. If something isn’t establishing as expected, we’ll come take a look and make it right.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 sm:max-w-sm">
                <div className="rounded-xl bg-card/80 border border-border p-3 text-center">
                  <Sprout className="h-5 w-5 mx-auto text-secondary" aria-hidden />
                  <div className="mt-1 text-xs font-medium">Fresh cut</div>
                </div>
                <div className="rounded-xl bg-card/80 border border-border p-3 text-center">
                  <Droplets className="h-5 w-5 mx-auto text-secondary" aria-hidden />
                  <div className="mt-1 text-xs font-medium">Water plan</div>
                </div>
                <div className="rounded-xl bg-card/80 border border-border p-3 text-center">
                  <Clock className="h-5 w-5 mx-auto text-secondary" aria-hidden />
                  <div className="mt-1 text-xs font-medium">30 days</div>
                </div>
              </div>
            </div>
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
              poster="/images/sodding-process-poster.jpg"
              preload="auto"
              onError={(e) => {
                // If video fails, show the poster image instead
                const video = e.target as HTMLVideoElement;
                video.style.display = "none";
                const img = video.parentNode?.querySelector("img");
                if (img) img.style.display = "block";
              }}
            >
              <source src="/videos/sodding-process.mp4" type="video/mp4" />
              <img
                src="/images/sodding-process-poster.jpg"
                alt="Sodding Process"
                className="w-full h-full object-cover"
                style={{ display: "none" }}
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-end p-4 sm:p-6 md:p-8">
              <h2 className="text-white text-center font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 px-2 sm:px-4 drop-shadow-md max-w-[90%] md:max-w-3xl">
                How We <span className="text-accent">Transform</span> Your Lawn
              </h2>
              <p className="text-white/90 text-center text-sm sm:text-base md:text-lg lg:text-xl max-w-[95%] sm:max-w-xl md:max-w-2xl px-2 sm:px-4 drop-shadow-sm">
                Our expert technicians follow a meticulous process to ensure
                your lawn looks perfect from day one
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
                    poster="/images/site-preparation-poster.jpg"
                    preload="auto"
                    onError={(e) => {
                      // If video fails, show the poster image instead
                      const video = e.target as HTMLVideoElement;
                      video.style.display = "none";
                      const img = video.parentNode?.querySelector("img");
                      if (img) img.style.display = "block";
                    }}
                  >
                    <source
                      src="/videos/site-preparation-new.mp4"
                      type="video/mp4"
                    />
                    <img
                      src="/images/site-preparation-poster.jpg"
                      alt="Site Preparation"
                      className="w-full h-full object-cover"
                      style={{ display: "none" }}
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    1
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">
                    Site Preparation
                  </h4>
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
                    poster="/images/sod-installation-poster.jpg"
                    preload="auto"
                    onError={(e) => {
                      // If video fails, show the poster image instead
                      const video = e.target as HTMLVideoElement;
                      video.style.display = "none";
                      const img = video.parentNode?.querySelector("img");
                      if (img) img.style.display = "block";
                    }}
                  >
                    <source src="/videos/sod-installation-optimized.mp4" type="video/mp4" />
                    <img
                      src="/images/sod-installation-poster.jpg"
                      alt="Sod Installation"
                      className="w-full h-full object-cover"
                      style={{ display: "none" }}
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    2
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">
                    Sod Installation
                  </h4>
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
                    poster="/images/rolling-watering-poster.jpg"
                    preload="auto"
                    onError={(e) => {
                      // If video fails, show the poster image instead
                      const video = e.target as HTMLVideoElement;
                      video.style.display = "none";
                      const img = video.parentNode?.querySelector("img");
                      if (img) img.style.display = "block";
                    }}
                  >
                    <source src="/videos/rolling-watering-optimized.mp4" type="video/mp4" />
                    <img
                      src="/images/rolling-watering-poster.jpg"
                      alt="Rolling and Watering"
                      className="w-full h-full object-cover"
                      style={{ display: "none" }}
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    3
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">
                    Rolling & Watering
                  </h4>
                  <p className="text-sm text-foreground/70">
                    Ensuring proper soil contact and initial moisture for
                    establishment
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
                    poster="/images/final-inspection-poster.jpg"
                    preload="auto"
                    onError={(e) => {
                      // If video fails, show the poster image instead
                      const video = e.target as HTMLVideoElement;
                      video.style.display = "none";
                      const img = video.parentNode?.querySelector("img");
                      if (img) img.style.display = "block";
                    }}
                  >
                    <source src="/videos/final-inspection-new.mp4" type="video/mp4" />
                    <img
                      src="/images/final-inspection-poster.jpg"
                      alt="Final Inspection"
                      className="w-full h-full object-cover"
                      style={{ display: "none" }}
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute -top-8 left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-card shadow-md">
                    4
                  </div>
                  <h4 className="font-medium text-lg mt-1 mb-1">
                    Final Inspection
                  </h4>
                  <p className="text-sm text-foreground/70">
                    Quality check and care instructions for proper establishment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
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

          <div className="space-y-3">
            <details className="group rounded-xl border border-border bg-card/80 p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-medium text-lg flex items-center justify-between">
                How soon can I walk on my new sod?
                <ChevronDown className="h-5 w-5 text-secondary group-open:rotate-180 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3 text-foreground/80">
                Light foot traffic is okay when necessary, but keep it minimal for the first 2–3 weeks while roots establish. By around week 3, it should be much more anchored.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card/80 p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-medium text-lg flex items-center justify-between">
                How often should I water my new sod?
                <ChevronDown className="h-5 w-5 text-secondary group-open:rotate-180 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3 text-foreground/80">
                The first two weeks are about keeping it consistently moist (not flooded). We’ll provide a schedule based on sun/shade, temps, and your soil so you don’t guess.
              </p>
            </details>

            <details className="group rounded-xl border border-border bg-card/80 p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-medium text-lg flex items-center justify-between">
                When should I first mow my new sod?
                <ChevronDown className="h-5 w-5 text-secondary group-open:rotate-180 transition-transform" aria-hidden />
              </summary>
              <p className="mt-3 text-foreground/80">
                Typically 2–3 weeks after install once it’s rooted and the grass reaches 3–4 inches. First mow should be higher and remove no more than 1/3 of the blade length.
              </p>
            </details>
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
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 px-8 rounded-lg transition-colors inline-block shadow-lg text-lg"
          >
            Request Sod Installation
          </a>
        </motion.div>
      </div>
    </section>
  );
}