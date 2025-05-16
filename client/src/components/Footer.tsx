export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Yard Bros Landscaping</h3>
            <p className="mb-4">Professional landscaping services for residential and commercial properties.</p>
            <p>Serving the local area since 2010</p>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>440-396-7474</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>sales@yardbrother.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>201 E. Bridge Street, Elyria, OH 44035</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Business Hours</h3>
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>7:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-green-700 text-center">
          <p>&copy; {new Date().getFullYear()} Yard Bros Landscaping. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
