
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  userType: z.enum(["client", "lsp", "admin"], {
    required_error: "Please select a user type.",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "client",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    // In a real app, you would validate against a backend
    // For demo purposes, we'll check localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === values.email);
    
    if (user) {
      // Check if user type matches
      if (user.userType !== values.userType && values.userType !== "admin") {
        toast({
          title: "Login failed",
          description: `This account is not registered as a ${values.userType === "lsp" ? "Legal Service Provider" : "Client"}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Special case for admin login (hardcoded for demo purposes)
      if (values.userType === "admin" && values.email === "admin@legalpulse.in" && values.password === "admin123") {
        const adminUser = {
          id: "admin-01",
          name: "Admin",
          email: values.email,
          userType: "admin" as "admin", // Fix type error by explicitly specifying as "admin"
        };
        
        login(adminUser);
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        navigate("/admin");
        setLoading(false);
        return;
      }
      
      // For regular users
      login(user);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Redirect based on user type
      if (user.userType === "lsp") {
        navigate("/lsp-dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-legal-navy mb-6">Login to Your Account</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>I am a:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="client" />
                      </FormControl>
                      <FormLabel className="font-normal">Client</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="lsp" />
                      </FormControl>
                      <FormLabel className="font-normal">Legal Service Provider</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
          
          <Button 
            type="submit" 
            className="w-full bg-legal-navy hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
          
          <div className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-legal-navy font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
