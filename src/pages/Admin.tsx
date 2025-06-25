
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Check, X, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LSPRegistration {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  experience: string;
  specialization: string;
  city: string;
  state: string;
  consultationFee: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const Admin = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<LSPRegistration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<LSPRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Fetch all LSP registrations
    const storedRegistrations = localStorage.getItem("lspRegistrations");
    if (storedRegistrations) {
      const parsedRegistrations = JSON.parse(storedRegistrations);
      setRegistrations(parsedRegistrations);
      setFilteredRegistrations(parsedRegistrations);
    }
    
    setLoading(false);
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    // Filter registrations based on search term and status filter
    let filtered = [...registrations];
    
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(reg => reg.status === statusFilter);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchTerm, statusFilter, registrations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleUpdateStatus = (id: string, newStatus: "approved" | "rejected") => {
    // Update registration status
    const updatedRegistrations = registrations.map(reg => {
      if (reg.id === id) {
        return { ...reg, status: newStatus };
      }
      return reg;
    });
    
    // Update localStorage
    localStorage.setItem("lspRegistrations", JSON.stringify(updatedRegistrations));
    
    // Update state
    setRegistrations(updatedRegistrations);
    
    // Show toast
    toast({
      title: `Registration ${newStatus}`,
      description: `The LSP registration has been ${newStatus}`,
    });
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to a detailed view
    // For this demo, we'll just show a toast
    toast({
      title: "View Details",
      description: `Viewing details for registration ${id}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  if (loading) {
    return <div className="container-custom py-12">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-legal-navy mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">LSP Registrations</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search registrations..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Fee (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">
                        {registration.firstName} {registration.lastName}
                        <div className="text-sm text-gray-500">{registration.email}</div>
                      </TableCell>
                      <TableCell>{registration.specialization}</TableCell>
                      <TableCell>{registration.city}, {registration.state}</TableCell>
                      <TableCell>{registration.consultationFee}</TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell>{new Date(registration.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(registration.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {registration.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleUpdateStatus(registration.id, "approved")}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleUpdateStatus(registration.id, "rejected")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No registrations found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
