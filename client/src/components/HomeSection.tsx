import { useState, useEffect } from 'react';

export default function HomeSection() {
  const [scrollIndicator, setScrollIndicator] = useState(true);
  
  // Hide scroll indicator after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="section-fade relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"></div>
        <video 
          className="absolute inset-0 min-w-full min-h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 text-white relative z-20">
        {/* Logo/Brand Element */}
        <div className="mb-12 flex justify-center md:justify-start">
          <div className="bg-white/10 backdrop-blur-sm py-3 px-6 rounded-full inline-flex items-center">
            <span className="text-3xl font-bold text-accent mr-2">YardBros</span>
            <span className="text-xl">Landscaping</span>
          </div>
        </div>
        
        <div className="max-w-4xl">
          {/* Enhanced Headline */}
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-3 text-white">
            Bring Your <span className="text-accent">Dream Yard</span> to Life
          </h1>
          <h2 className="text-2xl md:text-3xl font-heading mb-6 text-white/90">
            Professional landscaping with guaranteed satisfaction
          </h2>
          
          {/* Benefits List */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="mr-3 bg-accent/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Licensed & Insured Pros</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 bg-accent/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Free On-Site Estimates</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 bg-accent/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
          
          {/* Improved CTA Buttons */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mb-10">
            <a href="#quotes" className="bg-accent hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg text-center text-lg flex-grow sm:flex-grow-0">
              Get a Free Quote
            </a>
            <div className="grid grid-cols-3 gap-2">
              <a href="#services" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center">
                Services
              </a>
              <a href="#sod" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center">
                Sod
              </a>
              <a href="#calculator" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center">
                Calculator
              </a>
            </div>
          </div>
          
          {/* Trust Badge */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">Trusted by over 500+ homeowners in your area</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {scrollIndicator && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white text-center animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-80">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
