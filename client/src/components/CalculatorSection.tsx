import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function CalculatorSection() {
  // Keep refs but ensure content is visible by default
  const { ref: calculatorRef } = useScrollAnimation({ threshold: 0.1 });
  const { ref: helpSectionRef } = useScrollAnimation({ threshold: 0.1 });
  const [activeCalculator, setActiveCalculator] = useState<'lengthWidth' | 'area'>('lengthWidth');
  
  // Length & Width Calculator
  const [lwInputs, setLwInputs] = useState({
    length: '',
    width: '',
    depth: ''
  });
  const [lwResults, setLwResults] = useState({
    visible: false,
    cubicYards: '0',
    cubicFeet: '0'
  });
  
  // Area Calculator
  const [areaInputs, setAreaInputs] = useState({
    area: '',
    depth: ''
  });
  const [areaResults, setAreaResults] = useState({
    visible: false,
    cubicYards: '0',
    cubicFeet: '0'
  });
  
  const handleLwInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLwInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAreaInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const calculateLw = () => {
    const length = parseFloat(lwInputs.length);
    const width = parseFloat(lwInputs.width);
    const depth = parseFloat(lwInputs.depth);
    
    if (length > 0 && width > 0 && depth > 0) {
      // Convert dimensions to cubic feet
      const cubicFeet = (length * width * (depth / 12));
      // Convert cubic feet to cubic yards (27 cubic feet = 1 cubic yard)
      const cubicYards = cubicFeet / 27;
      
      setLwResults({
        visible: true,
        cubicYards: cubicYards.toFixed(2),
        cubicFeet: cubicFeet.toFixed(2)
      });
    } else {
      alert('Please enter valid dimensions greater than zero.');
    }
  };
  
  const calculateArea = () => {
    const area = parseFloat(areaInputs.area);
    const depth = parseFloat(areaInputs.depth);
    
    if (area > 0 && depth > 0) {
      // Convert dimensions to cubic feet
      const cubicFeet = area * (depth / 12);
      // Convert cubic feet to cubic yards
      const cubicYards = cubicFeet / 27;
      
      setAreaResults({
        visible: true,
        cubicYards: cubicYards.toFixed(2),
        cubicFeet: cubicFeet.toFixed(2)
      });
    } else {
      alert('Please enter valid dimensions greater than zero.');
    }
  };
  
  return (
    <AnimatedSection 
      id="calculator" 
      className="py-16 bg-gradient-to-tr from-gray-100 to-neutral"
      animation="fade"
    >
      <div className="container mx-auto px-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-8">
          <a href="#home" className="text-primary hover:text-secondary mr-3" aria-label="Go back to home">
            <i className="fas fa-chevron-left text-xl"></i>
          </a>
          <h2 className="text-3xl font-heading font-bold">Topsoil Calculator</h2>
        </div>
        
        <div className="mb-8">
          <p className="text-lg max-w-4xl">Use our calculator to determine how much topsoil you'll need for your landscaping project. Choose the calculation method that works best for you.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            className={`${activeCalculator === 'lengthWidth' ? 'bg-primary' : 'bg-gray-400'} hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md`}
            onClick={() => setActiveCalculator('lengthWidth')}
          >
            Length & Width
          </button>
          <button 
            className={`${activeCalculator === 'area' ? 'bg-primary' : 'bg-gray-400'} ${activeCalculator === 'area' ? 'hover:bg-primary/80' : 'hover:bg-gray-500'} text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md`}
            onClick={() => setActiveCalculator('area')}
          >
            Area
          </button>
        </div>
        
        <div 
          className="calculator-containers animate-from-bottom"
          style={{ transitionDelay: '0.3s' }}
          ref={calculatorRef as React.RefObject<HTMLDivElement>}
        >
          {/* Length & Width Calculator */}
          <div className={`calculator-container bg-white p-6 rounded-lg shadow-md ${activeCalculator === 'lengthWidth' ? '' : 'hidden'}`}>
            <h3 className="text-xl font-heading font-semibold mb-4">Calculate by Length & Width</h3>
            
            <div className="mb-6">
              <p className="mb-4">Please enter the dimensions of your area and the desired depth of topsoil:</p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="length" className="block text-sm font-semibold mb-2">Length (feet)</label>
                    <input 
                      type="number" 
                      id="length" 
                      name="length" 
                      min="1" 
                      value={lwInputs.length}
                      onChange={handleLwInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="width" className="block text-sm font-semibold mb-2">Width (feet)</label>
                    <input 
                      type="number" 
                      id="width" 
                      name="width" 
                      min="1" 
                      value={lwInputs.width}
                      onChange={handleLwInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="depth" className="block text-sm font-semibold mb-2">Depth (inches)</label>
                    <input 
                      type="number" 
                      id="depth" 
                      name="depth" 
                      min="1" 
                      max="12" 
                      value={lwInputs.depth}
                      onChange={handleLwInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={calculateLw}
                    className="bg-accent hover:bg-yellow-500 hover:text-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
            
            {lwResults.visible && (
              <div className="bg-neutral p-4 rounded-lg border border-gray-300">
                <h4 className="font-heading font-semibold mb-2">Results:</h4>
                <p>You will need approximately <span className="font-bold text-primary">{lwResults.cubicYards}</span> cubic yards of topsoil.</p>
                <p className="mt-2 text-sm">This is equivalent to approximately <span className="font-semibold">{lwResults.cubicFeet}</span> cubic feet.</p>
              </div>
            )}
          </div>
          
          {/* Area Calculator */}
          <div className={`calculator-container bg-white p-6 rounded-lg shadow-md ${activeCalculator === 'area' ? '' : 'hidden'}`}>
            <h3 className="text-xl font-heading font-semibold mb-4">Calculate by Area</h3>
            
            <div className="mb-6">
              <p className="mb-4">Please enter the area and the desired depth of topsoil:</p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="area" className="block text-sm font-semibold mb-2">Area (square feet)</label>
                    <input 
                      type="number" 
                      id="area" 
                      name="area" 
                      min="1" 
                      value={areaInputs.area}
                      onChange={handleAreaInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="areaDepth" className="block text-sm font-semibold mb-2">Depth (inches)</label>
                    <input 
                      type="number" 
                      id="areaDepth" 
                      name="depth" 
                      min="1" 
                      max="12" 
                      value={areaInputs.depth}
                      onChange={handleAreaInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={calculateArea}
                    className="bg-accent hover:bg-yellow-500 hover:text-primary text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
            
            {areaResults.visible && (
              <div className="bg-neutral p-4 rounded-lg border border-gray-300">
                <h4 className="font-heading font-semibold mb-2">Results:</h4>
                <p>You will need approximately <span className="font-bold text-primary">{areaResults.cubicYards}</span> cubic yards of topsoil.</p>
                <p className="mt-2 text-sm">This is equivalent to approximately <span className="font-semibold">{areaResults.cubicFeet}</span> cubic feet.</p>
              </div>
            )}
          </div>
        </div>
        
        <div 
          className="mt-8 bg-white p-6 rounded-lg shadow-md animate-from-right"
          style={{ transitionDelay: '0.5s' }}
          ref={helpSectionRef as React.RefObject<HTMLDivElement>}>
          <h3 className="text-xl font-heading font-semibold mb-4">Need Help with Your Topsoil?</h3>
          <p className="mb-4">Once you've calculated your topsoil needs, let us handle the delivery and spreading. We provide premium topsoil that's perfect for establishing new lawns and gardens.</p>
          <a href="#quotes" className="bg-primary hover:bg-primary/80 hover:text-white text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-block shadow-md">
            Request Topsoil Delivery Quote
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
