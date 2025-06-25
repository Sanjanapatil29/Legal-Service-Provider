
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  userType?: "client" | "lsp" | "admin";
}

interface LSPProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  experience: string;
  specialization: string;
  languages: string[];
  about: string;
  city: string;
  state: string;
  consultationFee: string;
  status: "pending" | "approved" | "rejected";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLSP: boolean;
  isAdmin: boolean;
  lspProfile: LSPProfile | null;
  login: (user: User) => void;
  logout: () => void;
  fetchLSPProfile: () => void;
  updateLSPProfile: (updatedProfile: Partial<LSPProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lspProfile, setLSPProfile] = useState<LSPProfile | null>(null);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // If user is an LSP, fetch their profile
        if (userData.userType === "lsp") {
          fetchLSPProfileData(userData.id);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);
  
  const fetchLSPProfileData = (userId: string) => {
    try {
      const registrations = JSON.parse(localStorage.getItem("lspRegistrations") || "[]");
      const lspData = registrations.find((reg: LSPProfile) => reg.userId === userId && reg.status === "approved");
      
      if (lspData) {
        setLSPProfile(lspData);
      } else {
        // Also check for pending registrations
        const pendingData = registrations.find((reg: LSPProfile) => reg.userId === userId);
        if (pendingData) {
          setLSPProfile(pendingData);
        }
      }
    } catch (error) {
      console.error("Error fetching LSP profile:", error);
    }
  };
  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    
    // Notify user of successful login
    toast({
      title: "Login successful",
      description: `Welcome back, ${userData.name}!`,
    });
    
    // If user is an LSP, fetch their profile
    if (userData.userType === "lsp") {
      fetchLSPProfileData(userData.id);
    }
  };
  
  const logout = () => {
    setUser(null);
    setLSPProfile(null);
    localStorage.removeItem("currentUser");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const fetchLSPProfile = () => {
    if (user) {
      fetchLSPProfileData(user.id);
    }
  };
  
  const updateLSPProfile = (updatedProfile: Partial<LSPProfile>) => {
    if (!user || !lspProfile) return;
    
    try {
      const registrations = JSON.parse(localStorage.getItem("lspRegistrations") || "[]");
      const updatedRegistrations = registrations.map((reg: LSPProfile) => {
        if (reg.userId === user.id) {
          return { ...reg, ...updatedProfile };
        }
        return reg;
      });
      
      localStorage.setItem("lspRegistrations", JSON.stringify(updatedRegistrations));
      
      // Update the local state
      setLSPProfile({ ...lspProfile, ...updatedProfile });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating LSP profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLSP: user?.userType === "lsp",
      isAdmin: user?.userType === "admin",
      lspProfile,
      login, 
      logout,
      fetchLSPProfile,
      updateLSPProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
