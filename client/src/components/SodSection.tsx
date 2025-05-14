import sodImage from '@assets/Sod.png';
import turfImage from '@assets/Turf.png';

export default function SodSection() {
  const sodTypes = [
    {
      name: "YardBros SunGold Blend",
      description: "Perfect for high-visibility areas, full sun exposure, and requires minimal maintenance. Offers exceptional disease resistance and a soft, luxurious texture for comfortable barefoot enjoyment.",
      image: sodImage
    },
    {
      name: "YardBros Cool Shade Blend",
      description: "Specially developed for shaded areas and cooler climates, thriving in various soil types. Features superior drought tolerance and provides excellent erosion control for sloped areas.",
      image: turfImage
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
          <p className="text-lg max-w-4xl">YardBros Landscaping offers two premium sod blends, carefully developed to thrive in different conditions. Our sod is freshly harvested, delivered directly to your location, and professionally installed for immediate curb appeal.</p>
          <div className="flex items-center mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-green-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <p className="text-sm text-gray-700">All YardBros sod varieties are backed by our 30-day establishment guarantee and include a complimentary post-installation care guide.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {sodTypes.map((sod, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img src={sod.image} alt={sod.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-xl font-heading font-bold text-white p-4">{sod.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="mt-2 text-gray-700 leading-relaxed">{sod.description}</p>
                <div className="mt-5 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-600 font-medium">Premium Quality</span>
                </div>
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
