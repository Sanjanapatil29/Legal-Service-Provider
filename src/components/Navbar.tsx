
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, Search } from "lucide-react";
import SearchCommand from "./SearchCommand";
import AuthStatus from "./auth/AuthStatus";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchCommand, setShowSearchCommand] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <SearchCommand isOpen={showSearchCommand} setIsOpen={setShowSearchCommand} />
      
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-legal-gold" />
            <span className="text-xl font-bold text-legal-navy">LegalPulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-legal-navy transition-colors ${isActive('/') ? 'font-bold text-legal-navy border-b-2 border-legal-navy' : 'font-medium'}`}
            >
              Home
            </Link>
            <Link 
              to="/directory" 
              className={`text-gray-700 hover:text-legal-navy transition-colors ${isActive('/directory') ? 'font-bold text-legal-navy border-b-2 border-legal-navy' : 'font-medium'}`}
            >
              Find LSPs
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-legal-navy transition-colors ${isActive('/about') ? 'font-bold text-legal-navy border-b-2 border-legal-navy' : 'font-medium'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 hover:text-legal-navy transition-colors ${isActive('/contact') ? 'font-bold text-legal-navy border-b-2 border-legal-navy' : 'font-medium'}`}
            >
              Contact
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearchCommand(true)}
              className="text-gray-700 hover:text-legal-navy"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Link 
              to="/register-lsp" 
              className={isActive('/register-lsp') ? 'opacity-90' : ''}
            >
              <Button className={`bg-legal-navy hover:bg-blue-800 text-white ml-4 ${isActive('/register-lsp') ? 'ring-2 ring-offset-2 ring-legal-navy' : ''}`}>
                Register as LSP
              </Button>
            </Link>
            
            <AuthStatus />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearchCommand(true)}
              className="text-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-legal-navy"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white pb-4 px-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-legal-navy py-2 ${isActive('/') ? 'font-bold text-legal-navy border-l-4 border-legal-navy pl-2' : 'font-medium'}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/directory" 
                className={`text-gray-700 hover:text-legal-navy py-2 ${isActive('/directory') ? 'font-bold text-legal-navy border-l-4 border-legal-navy pl-2' : 'font-medium'}`}
                onClick={() => setIsOpen(false)}
              >
                Find LSPs
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-700 hover:text-legal-navy py-2 ${isActive('/about') ? 'font-bold text-legal-navy border-l-4 border-legal-navy pl-2' : 'font-medium'}`}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-legal-navy py-2 ${isActive('/contact') ? 'font-bold text-legal-navy border-l-4 border-legal-navy pl-2' : 'font-medium'}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/register-lsp"
                onClick={() => setIsOpen(false)}
              >
                <Button 
                  className={`bg-legal-navy hover:bg-blue-800 text-white w-full mt-2 ${isActive('/register-lsp') ? 'ring-2 ring-offset-2 ring-legal-navy' : ''}`}
                >
                  Register as LSP
                </Button>
              </Link>
              
              <div className="pt-2">
                <AuthStatus />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
