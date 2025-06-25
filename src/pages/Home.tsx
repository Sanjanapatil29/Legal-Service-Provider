
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Check, ArrowRight } from "lucide-react";
import lspData from "@/data/lspData";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Featured LSPs for the homepage (showing only 4)
  const featuredLSPs = lspData.slice(0, 4);
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim() === "") {
      toast({
        title: "Search field is empty",
        description: "Please enter a search term to find legal service providers.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to the directory page with the search term
    navigate(`/directory?search=${encodeURIComponent(searchTerm)}`);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-legal-navy py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Find The Right Legal Professional For Your Needs
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Connect with verified Legal Service Providers across India. Make informed decisions with transparent profiles and reviews.
            </p>
            
            <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by specialty, location, or name..."
                      className="pl-10 h-12"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="h-12 w-full md:w-auto bg-legal-navy hover:bg-blue-800"
                >
                  Find LSPs
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-legal-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LegalPulse connects you with various legal service providers across multiple specializations to meet all your legal needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-legal-navy hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-legal-navy"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Verified Professionals</h3>
                <p className="text-gray-600 text-center">
                  All legal service providers on our platform are thoroughly verified for credentials and practice history.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-legal-gold hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-yellow-100 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-legal-gold"><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M5 10h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z"></path><path d="M9 10V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path><path d="M12 19v3"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Transparent Pricing</h3>
                <p className="text-gray-600 text-center">
                  See clear fee structures upfront, including consultation fees and service charges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-600 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Client Reviews</h3>
                <p className="text-gray-600 text-center">
                  Make informed decisions based on genuine reviews and ratings from previous clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured LSPs Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Legal Professionals</h2>
            <Link to="/directory" className="text-legal-navy hover:text-blue-700 font-semibold flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLSPs.map((lsp) => (
              <Card key={lsp.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={lsp.photo}
                      alt={lsp.name}
                      className="w-full h-full object-cover"
                    />
                    {lsp.verified && (
                      <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{lsp.name}</h3>
                        <p className="text-gray-600 text-sm">{lsp.specialization[0]}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{lsp.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{lsp.location.city}, {lsp.location.state}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Consultation Fee:</span> ₹{lsp.fees.consultation}
                      </p>
                      <Link to={`/lsp/${lsp.id}`}>
                        <Button className="w-full bg-legal-navy hover:bg-blue-800">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-legal-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the right legal service provider is easy with LegalPulse. Follow these simple steps:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-legal-navy">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Search</h3>
              <p className="text-gray-600">
                Search for legal professionals based on specialization, location, or language.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-legal-navy">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Compare</h3>
              <p className="text-gray-600">
                Review profiles, compare fees, and read client testimonials to make an informed choice.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-legal-navy">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-gray-600">
                Reach out directly to the legal professional of your choice through contact details provided.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-legal-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Are You a Legal Professional?</h2>
            <p className="text-gray-300 mb-8">
              Join our growing network of verified legal service providers and connect with clients looking for your expertise.
            </p>
            <Link to="/register-lsp">
              <Button className="bg-legal-gold hover:bg-yellow-600 text-legal-navy font-bold px-8 py-6 text-lg">
                Register as LSP
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
