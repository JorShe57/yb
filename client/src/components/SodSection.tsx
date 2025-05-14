import React from 'react';
import sodImage from '@assets/Sod.png';
import turfImage from '@assets/Turf.png';
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function SodSection() {
  const { ref: sodTypesRef, isVisible: sodTypesVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: compareRef, isVisible: compareVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ threshold: 0.1 });
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
    <AnimatedSection 
      id="sod" 
      className="py-16 bg-gradient-to-tr from-white to-green-50"
      animation="from-right"
      showTransitionToNext={true}
    >
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
        
        {/* Installation Process */}
        <div className="mb-12 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-heading font-bold text-primary mb-4">Our Installation Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">1</div>
              <h4 className="font-medium mb-1">Site Preparation</h4>
              <p className="text-sm text-gray-600">Removal of old turf and debris, soil grading and amendment</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">2</div>
              <h4 className="font-medium mb-1">Sod Installation</h4>
              <p className="text-sm text-gray-600">Precision cutting and seam-free placement of fresh sod</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">3</div>
              <h4 className="font-medium mb-1">Rolling & Watering</h4>
              <p className="text-sm text-gray-600">Ensuring proper soil contact and initial moisture for establishment</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-3">4</div>
              <h4 className="font-medium mb-1">Final Inspection</h4>
              <p className="text-sm text-gray-600">Quality check and care instructions for proper establishment</p>
            </div>
          </div>
        </div>
        
        {/* Sod Types with Enhanced Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                <div className="mt-4 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-green-600 font-medium">Premium Quality</span>
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <h4 className="font-medium text-sm mb-2">Best Season for Installation:</h4>
                  <div className="flex space-x-2">
                    {['Spring', 'Summer', 'Fall'].map(season => (
                      <span key={season} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">{season}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Comparison Table */}
        <div className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
          <h3 className="text-xl font-heading font-bold text-primary p-5 bg-gray-50 border-b border-gray-100">Sod Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SunGold Blend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cool Shade Blend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sun Exposure</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full Sun</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Partial to Full Shade</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Requirements</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Low to Moderate</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Maintenance Level</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Low</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Low</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Drought Resistance</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Traffic Tolerance</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex items-center text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"The YardBros team transformed our patchy lawn into a lush green space with their SunGold Blend. The quality of the sod and installation was exceptional!"</p>
              <div className="font-medium">Client in [Location]</div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="flex items-center text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"We were struggling with growing grass in our heavily shaded yard until we tried the Cool Shade Blend. It's been thriving for months now with minimal maintenance."</p>
              <div className="font-medium">Client in [Location]</div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
          <h3 className="text-xl font-heading font-bold text-primary p-5 bg-gray-50 border-b border-gray-100">Frequently Asked Questions</h3>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="font-medium text-primary mb-2">How soon can I walk on my new sod?</h4>
              <p className="text-gray-700 text-sm">We recommend limiting foot traffic for the first 2-3 weeks while the sod establishes its root system. After that, light traffic is fine, but wait 4-6 weeks before heavy use.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">How often should I water new sod?</h4>
              <p className="text-gray-700 text-sm">Water daily for the first two weeks, ensuring the soil remains moist but not waterlogged. After that, reduce to 2-3 times per week, depending on weather conditions.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">When should I first mow my new sod?</h4>
              <p className="text-gray-700 text-sm">Wait until your sod reaches about 3-4 inches in height, typically 2-3 weeks after installation. Use a sharp blade and never remove more than 1/3 of the grass height in a single mowing.</p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Do you provide maintenance services after installation?</h4>
              <p className="text-gray-700 text-sm">Yes, we offer ongoing lawn care services including regular mowing, fertilization, and seasonal treatments to keep your new sod looking its best.</p>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-12">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Recent Sod Installation Projects</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* These are placeholder images - replace with actual project photos */}
            <div className="group relative overflow-hidden rounded-lg shadow-md h-40 md:h-48">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">Project 1</span>
              </div>
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Front Yard Renovation</span>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md h-40 md:h-48">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">Project 2</span>
              </div>
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Backyard Makeover</span>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md h-40 md:h-48">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">Project 3</span>
              </div>
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Commercial Installation</span>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-md h-40 md:h-48">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">Project 4</span>
              </div>
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Sports Field</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a href="#quotes" className="bg-primary hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block shadow-lg">
            Request Sod Installation Quote
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
