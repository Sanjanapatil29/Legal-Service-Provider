
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  Check,
  Phone,
  Mail,
  Globe,
  Clock,
  Calendar,
  Award,
  Languages,
  IndianRupee,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import lspData from "@/data/lspData";

const LSPDetail = () => {
  const { id } = useParams<{ id: string }>();
  const lsp = lspData.find(l => l.id === Number(id));
  
  if (!lsp) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Legal Service Provider Not Found</h1>
        <p className="mb-6 text-gray-600">
          The LSP you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/directory">
          <Button className="bg-legal-navy">Return to Directory</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-legal-navy text-white py-8">
        <div className="container-custom">
          <Link to="/directory" className="flex items-center text-gray-300 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Directory
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="rounded-lg overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={lsp.photo}
                  alt={lsp.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
            
            <div className="md:w-3/4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-white">{lsp.name}</h1>
                    {lsp.verified && (
                      <Badge className="ml-2 bg-green-600 hover:bg-green-700 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 mt-1">{lsp.specialization.join(", ")}</p>
                </div>
                
                <div className="flex items-center mt-2 md:mt-0 bg-blue-800 rounded-lg px-3 py-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-lg font-bold">{lsp.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-300">{lsp.reviews} reviews</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-legal-gold mr-2" />
                  <span>{lsp.location.city}, {lsp.location.state}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-legal-gold mr-2" />
                  <span>{lsp.experience} years experience</span>
                </div>
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-legal-gold mr-2" />
                  <span>{lsp.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {/* Contact Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-legal-navy mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">{lsp.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-legal-navy mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{lsp.contact.email}</p>
                    </div>
                  </div>
                  
                  {lsp.contact.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-legal-navy mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a 
                          href={`https://${lsp.contact.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {lsp.contact.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-legal-navy mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">
                        {lsp.location.address}, {lsp.location.city}, {lsp.location.state}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button className="w-full bg-legal-navy hover:bg-blue-800">
                    <Phone className="h-4 w-4 mr-2" /> Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Fee Structure Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Fee Structure</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-legal-navy mr-2" />
                      <span className="font-medium">Consultation Fee</span>
                    </div>
                    <span className="font-bold text-lg">₹{lsp.fees.consultation}</span>
                  </div>
                  
                  {lsp.fees.hourly && (
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-legal-navy mr-2" />
                        <span className="font-medium">Hourly Rate</span>
                      </div>
                      <span className="font-bold text-lg">₹{lsp.fees.hourly}</span>
                    </div>
                  )}
                  
                  {lsp.fees.fixed && lsp.fees.fixed.length > 0 && (
                    <>
                      <div className="font-medium mb-2">Fixed Fee Services:</div>
                      {lsp.fees.fixed.map((service, index) => (
                        <div key={index} className="flex justify-between items-center pb-2">
                          <span className="text-gray-600">{service.service}</span>
                          <span className="font-bold">₹{service.amount}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600">
                    * Fees may vary based on the complexity of the case. Please contact for a detailed quote.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">About {lsp.name}</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">
                      {lsp.about}
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Practice Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {lsp.specialization.map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expertise" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
                    
                    <div className="space-y-4">
                      {lsp.specialization.map((spec, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                            <h3 className="font-bold">{spec}</h3>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {generateExpertiseDescription(spec, lsp.name)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-bold mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {lsp.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Can provide legal services in all the above languages.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="qualifications" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-bold mb-4">Qualifications & Experience</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-3">Education</h3>
                      <div className="space-y-4">
                        {lsp.qualification.map((qual, index) => (
                          <div key={index} className="flex">
                            <Award className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                            <div>
                              <p className="font-medium">{qual}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-3">Experience</h3>
                      <div className="flex">
                        <Calendar className="h-5 w-5 text-legal-gold mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">{lsp.experience} years of legal practice</p>
                          <p className="text-gray-600 text-sm">
                            Extensive experience in {lsp.specialization.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Professional Memberships</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Bar Council of {lsp.location.state}</li>
                        <li>Indian Association of Lawyers</li>
                        {lsp.specialization.includes("Intellectual Property") && (
                          <li>Intellectual Property Bar Association</li>
                        )}
                        {lsp.specialization.includes("Corporate Law") && (
                          <li>Corporate Law Bar Association</li>
                        )}
                        {lsp.specialization.includes("Family Law") && (
                          <li>Family Law Practitioners Association</li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Client Reviews */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Client Reviews</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 rounded-lg px-3 py-2 flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-lg font-bold">{lsp.rating}</span>
                      </div>
                      <span className="ml-2 text-gray-600">Based on {lsp.reviews} reviews</span>
                    </div>
                    <Button>Write a Review</Button>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {generateSampleReviews(lsp).map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{review.service}</Badge>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate expertise descriptions
const generateExpertiseDescription = (specialization: string, name: string) => {
  const descriptions: { [key: string]: string } = {
    "Corporate Law": `${name} provides comprehensive legal counsel for businesses of all sizes, handling incorporations, mergers, acquisitions, and corporate governance matters. Their approach focuses on practical solutions that protect client interests while enabling business growth.`,
    "Family Law": `${name} offers compassionate and dedicated representation in all family law matters, including divorce, child custody, alimony, and property division. They strive to find amicable resolutions while being prepared to advocate fiercely when necessary.`,
    "Criminal Law": `${name} provides strategic defense in criminal cases, from minor offenses to serious charges. Their thorough case preparation and courtroom expertise have resulted in numerous successful outcomes for clients throughout their career.`,
    "Intellectual Property": `${name} specializes in protecting creative and innovative assets through patents, trademarks, and copyrights. They help clients navigate complex IP regulations and enforce their rights against infringement.`,
    "Property Law": `${name} handles all aspects of real estate and property law, including transactions, disputes, title issues, and land use regulations. Their meticulous approach ensures clients' property interests are well-protected.`,
    "Tax Law": `${name} offers expert guidance on tax compliance, planning, and dispute resolution. Their dual expertise in law and accounting provides clients with comprehensive tax solutions that minimize liabilities while ensuring compliance.`,
    "Employment Law": `${name} represents both employers and employees in workplace legal matters, including contracts, discrimination claims, harassment cases, and wrongful termination. They balance pragmatic solutions with strong advocacy.`,
    "Consumer Law": `${name} advocates for consumer rights against unfair business practices, product liability issues, and service disputes. They have helped numerous clients receive compensation for damages and resolve consumer-related legal issues.`,
    "Mergers & Acquisitions": `${name} provides strategic counsel throughout the M&A process, from due diligence to post-merger integration. Their approach balances legal protection with business objectives to ensure successful transactions.`,
    "Business Law": `${name} offers practical legal guidance for businesses on contracts, liability issues, regulatory compliance, and dispute resolution. Their business-focused approach helps clients navigate legal complexities while achieving commercial goals.`,
    "Divorce Law": `${name} provides sensitive and strategic representation in divorce proceedings, focusing on fair settlements and minimizing emotional impact, especially when children are involved.`,
    "Child Custody": `${name} advocates for the best interests of children in custody disputes, helping parents negotiate arrangements that support healthy parent-child relationships.`,
    "Bail Applications": `${name} has extensive experience in securing bail for clients, with a strong track record of successful applications even in complex cases.`,
    "White Collar Crime": `${name} defends clients against fraud, embezzlement, and other financial crime allegations, developing strategic defenses based on thorough investigation and legal expertise.`,
    "Patents": `${name} guides inventors and companies through the patent application process, providing protection for novel inventions and technological innovations.`,
    "Trademarks": `${name} helps businesses protect their brand identity through trademark registration, enforcement, and defense against infringement.`,
    "Copyrights": `${name} assists creators in securing copyright protection for literary, artistic, and musical works, as well as software and digital content.`,
    "Real Estate": `${name} handles property transactions, leasing agreements, and development projects, ensuring legal compliance and protecting client interests.`,
    "Land Acquisition": `${name} navigates the complex legal landscape of land acquisition, representing both buyers and those whose land is being acquired.`,
    "GST Compliance": `${name} helps businesses understand and comply with GST regulations, avoiding penalties while optimizing tax positions.`,
    "Income Tax": `${name} provides counsel on income tax planning, compliance, and representation in tax disputes with authorities.`,
    "Labor Disputes": `${name} resolves workplace conflicts through negotiation, mediation, or litigation when necessary, protecting rights while seeking practical solutions.`,
    "Workplace Harassment": `${name} handles sensitive harassment cases with discretion, helping organizations implement preventive measures and addressing claims appropriately.`,
    "Civil Litigation": `${name} represents clients in civil disputes, developing strategic approaches to litigation that align with client goals and resource constraints.`,
    "Medical Negligence": `${name} advocates for victims of medical malpractice, securing compensation for injuries resulting from healthcare provider negligence.`
  };
  
  return descriptions[specialization] || `${name} has significant expertise in ${specialization}, providing clients with knowledgeable representation and practical solutions tailored to their specific needs.`;
};

// Helper function to generate sample reviews
const generateSampleReviews = (lsp: any) => {
  // Generate 3 sample reviews
  const reviews = [
    {
      name: "Amit Kumar",
      rating: 5,
      date: "15 Feb 2025",
      service: lsp.specialization[0],
      comment: `${lsp.name} provided excellent guidance throughout my case. Their expertise in ${lsp.specialization[0]} was evident from our first consultation. Highly recommend!`
    },
    {
      name: "Sneha Reddy",
      rating: 4,
      date: "23 Jan 2025",
      service: lsp.specialization.length > 1 ? lsp.specialization[1] : lsp.specialization[0],
      comment: `Professional service with clear communication at every step. ${lsp.name} helped me understand complex legal issues in simple terms and achieved a favorable outcome.`
    },
    {
      name: "Rajiv Malhotra",
      rating: 5,
      date: "05 Dec 2024",
      service: "Consultation",
      comment: `Very knowledgeable and responsive. ${lsp.name} answered all my questions during the consultation and provided a clear roadmap for my legal matter. Will definitely engage again if needed.`
    }
  ];
  
  return reviews;
};

export default LSPDetail;
