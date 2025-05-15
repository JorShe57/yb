import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { CheckCircle, Star, ChevronDown } from 'lucide-react';
import { 
  MotionDiv, 
  MotionList, 
  MotionListItem
} from '@/components/ui/motion';

// Animation variants for this component
const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  }
} as const;

export default function HomeSection() {
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax effect for video background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  
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

  const benefitsList = [
    { text: "Licensed & Insured Pros" },
    { text: "Free On-Site Estimates" },
    { text: "Satisfaction Guaranteed" },
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-10"></div>
        <video 
          className="absolute inset-0 min-w-full min-h-full object-cover scale-110"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 text-white relative z-20">
        {/* Logo/Brand Element */}
        <MotionDiv 
          variant="fadeInDown" 
          duration={0.7}
          className="mb-12 flex justify-center md:justify-start"
        >
          <div className="bg-white/10 backdrop-blur-sm py-3 px-6 rounded-full inline-flex items-center border border-white/10 shadow-glow">
            <span className="text-3xl font-bold text-accent mr-2">YardBros</span>
            <span className="text-xl">Landscaping</span>
          </div>
        </MotionDiv>
        
        <div className="max-w-4xl">
          {/* Enhanced Headline */}
          <MotionDiv 
            variant="fadeInUp" 
            delay={0.3}
            className="mb-3"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white">
              Bring Your <span className="text-accent relative">
                Dream Yard
                <span className="absolute bottom-1 left-0 w-full h-1 bg-accent/30 rounded-full"></span>
              </span> to Life
            </h1>
          </MotionDiv>
          
          <MotionDiv 
            variant="fadeInUp" 
            delay={0.5}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-heading text-white/90">
              Professional landscaping with guaranteed satisfaction
            </h2>
          </MotionDiv>
          
          {/* Benefits List with Staggered Animation */}
          <MotionList className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4" delay={0.7}>
            {benefitsList.map((benefit, index) => (
              <MotionListItem key={index} delay={index * 0.1}>
                <div className="flex items-center p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="mr-3 bg-accent/20 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <span>{benefit.text}</span>
                </div>
              </MotionListItem>
            ))}
          </MotionList>
          
          {/* Improved CTA Buttons */}
          <MotionDiv 
            variant="fadeInUp" 
            delay={1.0}
            className="mb-10"
          >
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
              <motion.a 
                href="#quotes"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={animations.zoomIn}
                transition={{ 
                  duration: 0.3, 
                  delay: 1.0, 
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg text-center text-lg flex-grow sm:flex-grow-0 flex items-center justify-center"
              >
                Get a Free Quote
                <ChevronDown className="ml-2 h-5 w-5" />
              </motion.a>
              
              <div className="grid grid-cols-3 gap-2">
                <motion.a 
                  href="#services" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Services
                </motion.a>
                <motion.a 
                  href="#sod" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sod
                </motion.a>
                <motion.a 
                  href="#calculator" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Calculator
                </motion.a>
              </div>
            </div>
          </MotionDiv>
          
          {/* Trust Badge */}
          <MotionDiv 
            variant="fadeInUp" 
            delay={1.2}
            className="inline-block"
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block border border-white/10 shadow-glow">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm">Trusted by over 500+ homeowners in your area</span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {scrollIndicator && (
        <motion.div 
          className="absolute bottom-10 left-1/2 z-20 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{ x: "-50%" }}
        >
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="text-sm mb-2 opacity-80">Scroll Down</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
