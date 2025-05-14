// ServicesSection.tsx
export default function ServicesSection() {
  const services = [
    {
      title: "Site Preparation & Grading",
      description: "We level and grade your yard for perfect drainage and a smooth, even surface—getting the base just right before any new grass goes down.",
      image: "https://i.imgur.com/6FeY54j.jpeg",
      alt: "Site Preparation & Grading"
    },
    {
      title: "Edging & Trimming",
      description: "Clean, crisp edges around sidewalks, driveways, and garden beds that enhance the overall appearance of your landscape.",
      image: "https://i.imgur.com/pPaLV0R.jpeg",
      alt: "Edging & Trimming"
    },
    {
      title: "Premium Sod Installation",
      description: "Transform your yard with our high-quality sod varieties, professionally installed for immediate and lasting results.",
      image: "https://i.imgur.com/pBYg2uy.jpeg",
      alt: "Premium Sod Installation"
    },
    {
      title: "Fertilization & Soil Amendment",
      description: "We enhance your soil with custom fertilization programs and amendments to create the perfect growing environment for your landscape.",
      image: "https://i.imgur.com/suPUhEJ.png",
      alt: "Fertilization & Soil Amendment"
    },
    {
      title: "Old Turf Removal",
      description: "Our efficient turf removal services prepare your yard for a fresh start, eliminating old grass and weeds completely.",
      image: "https://i.imgur.com/wzBRvp8.jpeg",
      alt: "Old Turf Removal"
    },
    {
      title: "Irrigation Consultation",
      description: "Get expert advice on water-efficient irrigation systems tailored to your landscape's specific needs.",
      image: "https://i.imgur.com/gPHqRDW.jpeg",
      alt: "Irrigation Consultation"
    }
  ];
  
  return (
    <section id="services" className="section-fade py-16 bg-gradient-to-br from-neutral to-gray-200">
      <div className="container mx-auto px-4">
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
                  <div className="service-title">{service.title}</div>
                </div>
                <div className="flip-card-back">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-primary">{service.title}</h3>
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
    </section>
  );
}
