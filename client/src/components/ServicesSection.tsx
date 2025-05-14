// ServicesSection.tsx
export default function ServicesSection() {
  const services = [
    {
      title: "Site Preparation & Grading",
      description: "We level and grade your yard for perfect drainage and a smooth, even surface—getting the base just right before any new grass goes down.",
      image: "https://pixabay.com/get/gca02011192e898afeafc8e955c200c2b7e7cd5dfac8a88b06859600d7536c80ffa5ecdf51200caccaa02fb75fe9a014511025e080b886dd024d096c2feb1c93c_1280.jpg",
      alt: "Site Preparation & Grading"
    },
    {
      title: "Edging & Trimming",
      description: "Clean, crisp edges around sidewalks, driveways, and garden beds that enhance the overall appearance of your landscape.",
      image: "https://pixabay.com/get/gc86b3569c81517d00674c28d05cebd01f9f0be825b3c4088f6e451dababd6aa9a752c21c41d7d908975e10990d2557cd6c98868e04212b16b56545e5e2739a42_1280.jpg",
      alt: "Edging & Trimming"
    },
    {
      title: "Premium Sod Installation",
      description: "Transform your yard with our high-quality sod varieties, professionally installed for immediate and lasting results.",
      image: "https://pixabay.com/get/gee74eaef1da24fdafbe4a47dd2cc94c0e92adc04cb1a7867817707c5dceb7f2f8dc2ac6fb49e7438a21ed586764afea646dc19ffcd70adc8497483371e4e8f51_1280.jpg",
      alt: "Premium Sod Installation"
    },
    {
      title: "Fertilization & Soil Amendment",
      description: "We enhance your soil with custom fertilization programs and amendments to create the perfect growing environment for your landscape.",
      image: "https://pixabay.com/get/gbbdc68c6ca128a83f25be3af29f2736a221257b04701fc93e3dedd00bdbb6bbe548588a4b661c8788c2d7c16182009fb3b022ba5a16d91963e38e30848026065_1280.jpg",
      alt: "Fertilization & Soil Amendment"
    },
    {
      title: "Old Turf Removal",
      description: "Our efficient turf removal services prepare your yard for a fresh start, eliminating old grass and weeds completely.",
      image: "https://pixabay.com/get/g5659ca724e3c929af46aa04d866262036ebbf6e76705149a3b4d7699455b93140f625b304c50aa8dfcaa79268ad4c929dd515245590dd6bea98980e88410d93c_1280.jpg",
      alt: "Old Turf Removal"
    },
    {
      title: "Irrigation Consultation",
      description: "Get expert advice on water-efficient irrigation systems tailored to your landscape's specific needs.",
      image: "https://images.unsplash.com/photo-1575286368486-a9bd023a3d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=320",
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
