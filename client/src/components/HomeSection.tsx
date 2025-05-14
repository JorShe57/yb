export default function HomeSection() {
  return (
    <section id="home" className="section-fade relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
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
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Transform Your Outdoor Space</h2>
          <p className="text-xl mb-8">Professional landscaping, sod installation, and yard maintenance services</p>
          <div className="flex flex-wrap gap-4">
            <a href="#quotes" className="bg-accent hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
              Get a Free Quote
            </a>
            <a href="#services" className="bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
              Our Services
            </a>
            <a href="#sod" className="bg-secondary hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
              Our Sod
            </a>
            <a href="#calculator" className="bg-primary hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
              Topsoil Calculator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
