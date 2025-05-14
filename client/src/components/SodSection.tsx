export default function SodSection() {
  const sodTypes = [
    {
      name: "Kentucky Bluegrass",
      description: "A lush, dense turf ideal for high-traffic areas with excellent winter hardiness.",
      image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400"
    },
    {
      name: "Bermuda Grass",
      description: "Drought-resistant and heat-tolerant, perfect for sunny locations.",
      image: "https://pixabay.com/get/gfcfa334888d5dad6ac5c98709d17546370eb791038762e8ce26d1fc70c93e483caa350325d53de87627c253b5fe7b15abb9a989be1f1cae4c1225119e545fb2c_1280.jpg"
    },
    {
      name: "Zoysia Grass",
      description: "Low-maintenance with excellent heat and drought tolerance.",
      image: "https://pixabay.com/get/gf6de73d46e31a54c299277dc3be82721dc6d047487562120c7407dc12dc3a4bebd3dbd73586bf973ff0c5a6c9205343babe7e7cfbdbde60ae2072d9ff79517fd_1280.jpg"
    },
    {
      name: "Tall Fescue",
      description: "Excellent shade tolerance and year-round color in most climates.",
      image: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400"
    }
  ];
  
  return (
    <section id="sod" className="section-fade py-16 bg-gradient-to-tr from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Our Sod</h2>
        </div>
        
        <div className="mb-8">
          <p className="text-lg max-w-4xl">We offer a variety of premium sod options to suit your specific needs and local climate conditions. All our sod is freshly harvested and delivered directly to your location.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sodTypes.map((sod, index) => (
            <div key={index} className="bg-neutral rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={sod.image} alt={sod.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-heading font-semibold text-primary">{sod.name}</h3>
                <p className="mt-2 text-sm">{sod.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a href="#quotes" className="bg-primary hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block shadow-lg">
            Request Sod Installation Quote
          </a>
        </div>
      </div>
    </section>
  );
}
