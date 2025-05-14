// ServicesSection.tsx
import ParallaxBackground from "./ParallaxBackground";

export default function ServicesSection() {
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
    <ParallaxBackground 
      imageUrl="/images/backgrounds/house-bg.png" 
      className="section-fade py-16"
      speed={0.15}
    >
      <div className="container mx-auto px-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-8">
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Our Services</h2>
        </div>
        
        <div className="flex flex-wrap justify-center">
          {services.map((service, index) => (
            <div key={index} className="flip-card" tabIndex={0}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={service.image} alt={service.alt} />
                </div>
                <div className="flip-card-back">
                  <p>{service.description}</p>
                  <a href="#quotes" className="btn">Get a Quote</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#quotes" className="bg-accent hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block shadow-lg">
            Book a Consultation
          </a>
        </div>
      </div>
    </ParallaxBackground>
  );
}
