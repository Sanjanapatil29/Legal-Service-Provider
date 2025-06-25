
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    // In a real app, this would connect to a backend service
    // For demo purposes, we'll store in localStorage
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((user: any) => user.email === values.email);
    
    if (emailExists) {
      toast({
        title: "Email already in use",
        description: "Please use a different email address or login to your existing account.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    const user = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      userType: "client" as "client", // Client is the only option for direct signup
    };
    
    // Save to localStorage (not secure - for demo only)
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Set current user
    login(user);
    
    toast({
      title: "Account created",
      description: "You've successfully created a client account!",
    });
    
    // Redirect to home page
    navigate("/");
    
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-legal-navy mb-6">Create a Client Account</h1>
      <p className="text-sm text-gray-600 mb-6">
        Looking to register as a Legal Service Provider? 
        <Link to="/register-lsp" className="text-legal-navy font-medium ml-1">
          Register as LSP here
        </Link>
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-legal-navy hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
          
          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-legal-navy font-medium">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
