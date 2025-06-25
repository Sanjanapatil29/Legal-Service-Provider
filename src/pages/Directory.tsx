import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Star,
  Check,
  Filter,
  X,
  SlidersHorizontal,
} from "lucide-react";
import lspData, { LSP } from "@/data/lspData";
import { toast } from "@/components/ui/use-toast";

const Directory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search param from URL if present
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filteredLSPs, setFilteredLSPs] = useState<LSP[]>(lspData);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  
  // Extract unique values for filter options
  const allSpecializations = Array.from(
    new Set(lspData.flatMap(lsp => lsp.specialization))
  ).sort();
  
  const allStates = Array.from(
    new Set(lspData.map(lsp => lsp.location.state))
  ).sort();
  
  const allLanguages = Array.from(
    new Set(lspData.flatMap(lsp => lsp.languages))
  ).sort();
  
  // Handle search input change with real-time filtering
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL with search term
    if (value) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('search', value);
      navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
    } else {
      navigate(location.pathname, { replace: true });
    }
  };
  
  // Apply filters whenever filter criteria change or search term changes
  useEffect(() => {
    let results = lspData;
    
    // Search term filter (real-time)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        lsp =>
          lsp.name.toLowerCase().includes(term) ||
          lsp.specialization.some(s => s.toLowerCase().includes(term)) ||
          lsp.location.city.toLowerCase().includes(term) ||
          lsp.location.state.toLowerCase().includes(term)
      );
    }
    
    // Specialization filter
    if (selectedSpecializations.length > 0) {
      results = results.filter(lsp =>
        lsp.specialization.some(s => selectedSpecializations.includes(s))
      );
    }
    
    // State filter
    if (selectedStates.length > 0) {
      results = results.filter(lsp => selectedStates.includes(lsp.location.state));
    }
    
    // Language filter
    if (selectedLanguages.length > 0) {
      results = results.filter(lsp =>
        lsp.languages.some(l => selectedLanguages.includes(l))
      );
    }
    
    // Verified filter
    if (verifiedOnly) {
      results = results.filter(lsp => lsp.verified);
    }
    
    // Sorting
    switch (sortBy) {
      case "rating-high":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case "experience-high":
        results = [...results].sort((a, b) => b.experience - a.experience);
        break;
      case "fee-low":
        results = [...results].sort((a, b) => a.fees.consultation - b.fees.consultation);
        break;
      case "fee-high":
        results = [...results].sort((a, b) => b.fees.consultation - a.fees.consultation);
        break;
      default:
        // Default is relevance, which is the original order
        break;
    }
    
    setFilteredLSPs(results);
  }, [
    searchTerm,
    selectedSpecializations,
    selectedStates,
    selectedLanguages,
    verifiedOnly,
    sortBy
  ]);
  
  const toggleSpecialization = (specialization: string) => {
    setSelectedSpecializations(prev =>
      prev.includes(specialization)
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };
  
  const toggleState = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };
  
  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };
  
  const clearFilters = () => {
    setSelectedSpecializations([]);
    setSelectedStates([]);
    setSelectedLanguages([]);
    setVerifiedOnly(false);
    setSortBy("relevance");
    setSearchTerm("");
    navigate(location.pathname, { replace: true });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-legal-navy text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-4">Find Legal Service Providers</h1>
          <p className="text-gray-300 mb-6">
            Browse through our extensive directory of verified legal professionals across India
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-4">
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
                type="button"
                className="h-12 md:w-auto bg-legal-navy hover:bg-blue-800 flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="bg-white h-full w-4/5 max-w-md p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Specialization</h3>
                    <div className="space-y-2">
                      {allSpecializations.map((spec) => (
                        <div key={spec} className="flex items-center">
                          <Checkbox
                            id={`spec-mobile-${spec}`}
                            checked={selectedSpecializations.includes(spec)}
                            onCheckedChange={() => toggleSpecialization(spec)}
                          />
                          <label
                            htmlFor={`spec-mobile-${spec}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {spec}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">State</h3>
                    <div className="space-y-2">
                      {allStates.map((state) => (
                        <div key={state} className="flex items-center">
                          <Checkbox
                            id={`state-mobile-${state}`}
                            checked={selectedStates.includes(state)}
                            onCheckedChange={() => toggleState(state)}
                          />
                          <label
                            htmlFor={`state-mobile-${state}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {state}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Language</h3>
                    <div className="space-y-2">
                      {allLanguages.map((lang) => (
                        <div key={lang} className="flex items-center">
                          <Checkbox
                            id={`lang-mobile-${lang}`}
                            checked={selectedLanguages.includes(lang)}
                            onCheckedChange={() => toggleLanguage(lang)}
                          />
                          <label
                            htmlFor={`lang-mobile-${lang}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {lang}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified-mobile"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                    />
                    <label
                      htmlFor="verified-mobile"
                      className="text-sm font-medium leading-none"
                    >
                      Verified LSPs only
                    </label>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="hidden lg:block">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Specialization</h3>
                <div className="space-y-2">
                  {allSpecializations.map((spec) => (
                    <div key={spec} className="flex items-center">
                      <Checkbox
                        id={`spec-${spec}`}
                        checked={selectedSpecializations.includes(spec)}
                        onCheckedChange={() => toggleSpecialization(spec)}
                      />
                      <label
                        htmlFor={`spec-${spec}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">State</h3>
                <div className="space-y-2">
                  {allStates.map((state) => (
                    <div key={state} className="flex items-center">
                      <Checkbox
                        id={`state-${state}`}
                        checked={selectedStates.includes(state)}
                        onCheckedChange={() => toggleState(state)}
                      />
                      <label
                        htmlFor={`state-${state}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Language</h3>
                <div className="space-y-2">
                  {allLanguages.map((lang) => (
                    <div key={lang} className="flex items-center">
                      <Checkbox
                        id={`lang-${lang}`}
                        checked={selectedLanguages.includes(lang)}
                        onCheckedChange={() => toggleLanguage(lang)}
                      />
                      <label
                        htmlFor={`lang-${lang}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6 flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={verifiedOnly}
                  onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                />
                <label
                  htmlFor="verified"
                  className="text-sm font-medium leading-none"
                >
                  Verified LSPs only
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredLSPs.length}</span> results
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating-high">Highest Rating</SelectItem>
                    <SelectItem value="experience-high">Most Experienced</SelectItem>
                    <SelectItem value="fee-low">Lowest Fee</SelectItem>
                    <SelectItem value="fee-high">Highest Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(selectedSpecializations.length > 0 || 
              selectedStates.length > 0 || 
              selectedLanguages.length > 0 || 
              verifiedOnly || 
              searchTerm) && (
              <div className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Applied Filters:</span>
                  
                  {searchTerm && (
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      Search: {searchTerm}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => {
                          setSearchTerm("");
                          navigate(location.pathname, { replace: true });
                        }} 
                      />
                    </Badge>
                  )}
                  
                  {selectedSpecializations.map(spec => (
                    <Badge 
                      key={`filter-${spec}`} 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {spec}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleSpecialization(spec)} 
                      />
                    </Badge>
                  ))}
                  
                  {selectedStates.map(state => (
                    <Badge 
                      key={`filter-${state}`} 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {state}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleState(state)} 
                      />
                    </Badge>
                  ))}
                  
                  {selectedLanguages.map(lang => (
                    <Badge 
                      key={`filter-${lang}`} 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {lang}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleLanguage(lang)} 
                      />
                    </Badge>
                  ))}
                  
                  {verifiedOnly && (
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      Verified Only
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setVerifiedOnly(false)} 
                      />
                    </Badge>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="ml-auto text-xs h-7"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
            
            {filteredLSPs.length > 0 ? (
              <div className="space-y-4">
                {filteredLSPs.map((lsp) => (
                  <Card key={lsp.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 relative">
                          <img
                            src={lsp.photo}
                            alt={lsp.name}
                            className="w-full h-full object-cover min-h-[160px]"
                          />
                          {lsp.verified && (
                            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 flex items-center gap-1">
                              <Check className="h-3 w-3" /> Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-bold text-xl mb-1">{lsp.name}</h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {lsp.specialization.map((spec, index) => (
                                  <Badge key={index} variant="outline">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{lsp.location.city}, {lsp.location.state}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 text-sm font-medium">{lsp.rating}</span>
                                <span className="mx-1 text-gray-400">•</span>
                                <span className="text-sm text-gray-600">{lsp.reviews} reviews</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Languages:</span>{" "}
                                {lsp.languages.join(", ")}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 text-right">
                              <p className="text-legal-navy font-bold">
                                ₹{lsp.fees.consultation}
                                <span className="text-sm font-normal text-gray-600"> consultation</span>
                              </p>
                              <p className="text-sm text-gray-600 mb-4">
                                {lsp.experience} years experience
                              </p>
                              <Link to={`/lsp/${lsp.id}`}>
                                <Button className="bg-legal-navy hover:bg-blue-800">
                                  View Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                            {lsp.about}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold mb-2">No Results Found</h2>
                <p className="text-gray-600 mb-4">
                  We couldn't find any legal service providers matching your criteria.
                </p>
                <Button 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
