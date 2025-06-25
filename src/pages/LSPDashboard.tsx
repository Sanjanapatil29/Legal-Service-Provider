
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, AlertTriangle, CheckCircle, Clock, Save, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const LSPDashboard = () => {
  const { user, isAuthenticated, isLSP, lspProfile, fetchLSPProfile, updateLSPProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    designation: "",
    experience: "",
    about: "",
    consultationFee: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isLSP) {
      navigate("/");
      return;
    }

    fetchLSPProfile();
    setLoading(false);
    
    // Initialize form data when lspProfile is loaded
    if (lspProfile) {
      setFormData({
        firstName: lspProfile.firstName,
        lastName: lspProfile.lastName,
        phone: lspProfile.phone,
        designation: lspProfile.designation,
        experience: lspProfile.experience,
        about: lspProfile.about,
        consultationFee: lspProfile.consultationFee,
      });
    }
  }, [isAuthenticated, isLSP, navigate, fetchLSPProfile, lspProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    updateLSPProfile(formData);
    setEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const renderStatusMessage = () => {
    if (!lspProfile) {
      return (
        <Card className="border-yellow-500 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-700">Registration Required</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  You haven't completed your LSP registration yet. Please register to appear in our directory.
                </p>
                <Button 
                  onClick={() => navigate("/register-lsp")} 
                  className="mt-4 bg-yellow-600 hover:bg-yellow-700"
                >
                  Complete Registration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    switch (lspProfile.status) {
      case "approved":
        return (
          <Card className="border-green-500 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-700">Registration Approved</h3>
                  <p className="text-sm text-green-600 mt-1">
                    Your LSP registration has been approved. Your profile is now visible in our directory.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "rejected":
        return (
          <Card className="border-red-500 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-700">Registration Rejected</h3>
                  <p className="text-sm text-red-600 mt-1">
                    Your LSP registration has been rejected. Please contact support for more information.
                  </p>
                  <Button 
                    onClick={() => navigate("/register-lsp")} 
                    className="mt-4 bg-red-600 hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="border-blue-500 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-700">Registration Pending</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Your LSP registration is currently under review. We'll notify you once it's approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  if (loading) {
    return <div className="container-custom py-12">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-legal-navy">LSP Dashboard</h1>
          <div>
            <Button 
              onClick={() => navigate("/my-registrations")} 
              variant="outline" 
              className="mr-2"
            >
              My Registrations
            </Button>
          </div>
        </div>

        {renderStatusMessage()}

        {lspProfile && (
          <div className="mt-8 space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Profile Information</CardTitle>
                  {!editing ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => setEditing(true)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1 text-red-600"
                        onClick={() => {
                          setEditing(false);
                          // Reset form data to original values
                          if (lspProfile) {
                            setFormData({
                              firstName: lspProfile.firstName,
                              lastName: lspProfile.lastName,
                              phone: lspProfile.phone,
                              designation: lspProfile.designation,
                              experience: lspProfile.experience,
                              about: lspProfile.about,
                              consultationFee: lspProfile.consultationFee,
                            });
                          }
                        }}
                      >
                        <X className="h-4 w-4" /> Cancel
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center gap-1 text-green-600"
                        onClick={handleSaveProfile}
                      >
                        <Save className="h-4 w-4" /> Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-500 text-sm">PERSONAL</h3>
                    <div className="mt-3 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        {editing ? (
                          <div className="flex gap-2">
                            <Input
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="First Name"
                            />
                            <Input
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Last Name"
                            />
                          </div>
                        ) : (
                          <p className="font-medium">{lspProfile.firstName} {lspProfile.lastName}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{lspProfile.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        {editing ? (
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                          />
                        ) : (
                          <p className="font-medium">{lspProfile.phone}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{lspProfile.city}, {lspProfile.state}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-500 text-sm">PROFESSIONAL</h3>
                    <div className="mt-3 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Designation</p>
                        {editing ? (
                          <Input
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            placeholder="Professional Designation"
                          />
                        ) : (
                          <p className="font-medium">{lspProfile.designation}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        {editing ? (
                          <Input
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="Years of Experience"
                            type="number"
                          />
                        ) : (
                          <p className="font-medium">{lspProfile.experience} years</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Specialization</p>
                        <p className="font-medium">{lspProfile.specialization}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Consultation Fee</p>
                        {editing ? (
                          <Input
                            name="consultationFee"
                            value={formData.consultationFee}
                            onChange={handleInputChange}
                            placeholder="Consultation Fee"
                            type="number"
                          />
                        ) : (
                          <p className="font-medium">₹{lspProfile.consultationFee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-500 text-sm">LANGUAGES</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lspProfile.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-500 text-sm">ABOUT</h3>
                  {editing ? (
                    <Textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      className="mt-2 min-h-[120px]"
                    />
                  ) : (
                    <p className="mt-2 text-gray-700">{lspProfile.about}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LSPDashboard;
