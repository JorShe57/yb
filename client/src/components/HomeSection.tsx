export default function HomeSection() {
  return (
    <section id="home" className="section-fade relative min-h-[80vh] flex items-center bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=650')"}}>
      <div className="container mx-auto px-4 py-16 text-white">
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
