import React from "react";
import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-legal-navy text-white">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-legal-gold" />
              <span className="text-xl font-bold">LegalPulse</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting clients with verified Legal Service Providers across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-legal-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-white hover:text-legal-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-white hover:text-legal-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-legal-gold">Home</Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-300 hover:text-legal-gold">Find LSPs</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-legal-gold">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-legal-gold">Contact</Link>
              </li>
              <li>
                <Link to="/register-lsp" className="text-gray-300 hover:text-legal-gold">Register as LSP</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-legal-gold">Terms of Service</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-legal-gold">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-legal-gold">Cookie Policy</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-legal-gold">Disclaimer</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-legal-gold mt-0.5" />
                <span className="text-gray-300">123 Legal Street, Jalgaon, Maharashtra, India 425001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-legal-gold" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-legal-gold" />
                <span className="text-gray-300">contact@legalpulse.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LegalPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
