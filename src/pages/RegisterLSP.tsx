
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  designation: z.string().min(2, { message: "Professional designation is required" }),
  experience: z.string().min(1, { message: "Years of experience is required" }),
  specialization: z.string().min(1, { message: "Primary specialization is required" }),
  languages: z.array(z.string()).min(1, { message: "At least one language is required" }),
  about: z.string().min(30, { message: "About section must be at least 30 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  consultationFee: z.string().min(1, { message: "Consultation fee is required" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type FormValues = z.infer<typeof formSchema>;

const RegisterLSP = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  const [needsAccountCreation, setNeedsAccountCreation] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      designation: "",
      experience: "",
      specialization: "",
      languages: [],
      about: "",
      city: "",
      state: "",
      consultationFee: "",
      terms: false,
    },
  });
  
  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated) {
      setNeedsAccountCreation(true);
    } else if (user?.userType !== "lsp" && user?.userType !== "admin") {
      toast({
        title: "Account type mismatch",
        description: "You need to log in as a Legal Service Provider to register.",
        variant: "destructive"
      });
      setNeedsAccountCreation(true);
    }
    
    // Update form if user changes
    if (user?.email) {
      form.setValue("email", user.email);
    }
  }, [isAuthenticated, user, form]);
  
  const createLSPAccount = () => {
    // Extract name from the form
    const firstName = form.getValues("firstName");
    const lastName = form.getValues("lastName");
    const email = form.getValues("email");
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((u: any) => u.email === email);
    
    if (emailExists) {
      toast({
        title: "Email already in use",
        description: "Please log in with this email or use a different email address.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Create a new LSP user
    const newUser = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      email: email,
      userType: "lsp" as "lsp",
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Log in as this user
    login(newUser);
    
    return newUser.id;
  };
  
  const onSubmit = (data: FormValues) => {
    setLoading(true);
    
    let userId = user?.id;
    
    // If not logged in or not an LSP, create an account first
    if (!isAuthenticated || (user?.userType !== "lsp" && user?.userType !== "admin")) {
      userId = createLSPAccount();
    }
    
    if (!userId) {
      toast({
        title: "Error creating account",
        description: "There was a problem creating your LSP account.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Create the registration object
    const registration = {
      id: `REG-${Date.now()}`,
      userId: userId,
      ...data,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage (in a real app, this would be an API call)
    const existingRegistrations = JSON.parse(localStorage.getItem("lspRegistrations") || "[]");
    
    // Check if user already has a registration
    const userAlreadyRegistered = existingRegistrations.some(
      (reg: any) => reg.userId === userId && reg.status !== "rejected"
    );
    
    if (userAlreadyRegistered) {
      toast({
        title: "Registration already exists",
        description: "You have already submitted a registration. Please check your registrations page for status.",
        variant: "destructive",
      });
      navigate("/my-registrations");
      setLoading(false);
      return;
    }
    
    existingRegistrations.push(registration);
    localStorage.setItem("lspRegistrations", JSON.stringify(existingRegistrations));
    
    toast({
      title: "Registration submitted",
      description: "Your registration request has been submitted. We will review your details and get back to you shortly.",
    });
    
    // Redirect to the registrations page
    navigate("/my-registrations");
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-legal-navy mb-6">Register as a Legal Service Provider</h1>
          
          {needsAccountCreation && (
            <Card className="mb-8 border-blue-500 bg-blue-50">
              <CardContent className="pt-6">
                <h2 className="font-semibold text-blue-700 text-lg mb-2">Create an LSP Account</h2>
                <p className="text-blue-600 mb-4">
                  This registration will also create a Legal Service Provider account for you.
                </p>
                <div className="flex gap-4 mt-2">
                  <Link to="/login">
                    <Button variant="outline">Already have an account? Log in</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
          
          <p className="text-gray-600 mb-8">
            Join our growing network of verified legal professionals and connect with clients looking for your expertise.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-legal-navy">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address*</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-legal-navy">Professional Information</h2>
                
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Designation*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Advocate, Lawyer, Legal Consultant" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience*</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Specialization*</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="civil">Civil Law</SelectItem>
                          <SelectItem value="criminal">Criminal Law</SelectItem>
                          <SelectItem value="corporate">Corporate Law</SelectItem>
                          <SelectItem value="family">Family Law</SelectItem>
                          <SelectItem value="property">Property Law</SelectItem>
                          <SelectItem value="tax">Tax Law</SelectItem>
                          <SelectItem value="intellectual">Intellectual Property Law</SelectItem>
                          <SelectItem value="labor">Labor Law</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="languages"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Languages Spoken*</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {["english", "hindi", "tamil", "telugu", "bengali", "marathi"].map((language) => (
                          <FormField
                            key={language}
                            control={form.control}
                            name="languages"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={language}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(language)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, language])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== language
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Yourself*</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Brief description of your background, expertise, and approach" 
                          className="min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-legal-navy">Location & Fees</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State*</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                            <SelectItem value="assam">Assam</SelectItem>
                            <SelectItem value="bihar">Bihar</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="tamil">Tamil Nadu</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="up">Uttar Pradesh</SelectItem>
                            <SelectItem value="wb">West Bengal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="consultationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Fee (₹)*</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <span className="text-legal-navy font-medium">Terms and Conditions</span> and <span className="text-legal-navy font-medium">Privacy Policy</span>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-legal-navy hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLSP;
