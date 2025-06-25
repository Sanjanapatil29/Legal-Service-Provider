
import { Button } from "@/components/ui/button";
import { Globe, Scale, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              About LegalPulse
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Connecting clients with verified legal professionals across India
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At LegalPulse, we believe that everyone deserves access to quality legal services. Our mission is to bridge the gap between clients seeking legal assistance and qualified legal service providers across India.
            </p>
            <p className="text-gray-700 mb-4">
              We strive to create a transparent, accessible platform that empowers clients to make informed decisions about their legal needs, while providing legal professionals with a platform to showcase their expertise and connect with clients.
            </p>
            <p className="text-gray-700">
              Through innovation and commitment to excellence, we aim to transform how legal services are discovered and accessed throughout India.
            </p>
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="section bg-legal-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at LegalPulse
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <ShieldCheck className="h-8 w-8 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Trust & Integrity</h3>
              <p className="text-gray-600 text-center">
                We verify all legal professionals on our platform and maintain the highest standards of transparency and integrity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Globe className="h-8 w-8 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Accessibility</h3>
              <p className="text-gray-600 text-center">
                Making quality legal services accessible to everyone across India, regardless of location or background.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Client-Focused</h3>
              <p className="text-gray-600 text-center">
                Empowering clients with information and choice, putting their needs at the center of our platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Scale className="h-8 w-8 text-legal-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Professional Excellence</h3>
              <p className="text-gray-600 text-center">
                Promoting the highest standards of professional conduct and expertise in legal service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-gray-700 mb-4">
              LegalPulse was founded in 2025 by a team of legal professionals and technology experts who recognized the challenges many people face when trying to find reliable legal assistance in India.
            </p>
            <p className="text-gray-700 mb-4">
              Based in Jalgaon, Maharashtra, our platform has quickly grown to connect thousands of clients with verified legal service providers across the country. We are committed to continuously improving our services and expanding our network to reach even more people in need of legal assistance.
            </p>
            <p className="text-gray-700">
              Today, LegalPulse stands as a trusted intermediary in the legal services market, known for our commitment to quality, transparency, and client satisfaction.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section bg-legal-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join LegalPulse Today</h2>
            <p className="text-gray-300 mb-8">
              Whether you're looking for legal assistance or you're a legal professional wanting to connect with clients, LegalPulse is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/directory">
                <Button className="bg-white text-legal-navy hover:bg-gray-100 px-8 py-6 text-lg w-full sm:w-auto">
                  Find a Legal Professional
                </Button>
              </Link>
              <Link to="/register-lsp">
                <Button className="bg-legal-gold hover:bg-yellow-600 text-legal-navy font-bold px-8 py-6 text-lg w-full sm:w-auto">
                  Register as LSP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
