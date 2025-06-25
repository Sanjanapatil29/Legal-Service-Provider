
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LSPRegistration {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const MyRegistrations = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<LSPRegistration[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // In a real app, fetch from a backend API
    // For demo, we'll get from localStorage
    const storedRegistrations = localStorage.getItem("lspRegistrations");
    if (storedRegistrations) {
      try {
        const allRegistrations = JSON.parse(storedRegistrations);
        // Filter registrations for the current user
        const userRegistrations = allRegistrations.filter(
          (reg: LSPRegistration) => reg.userId === user?.id
        );
        setRegistrations(userRegistrations);
      } catch (error) {
        console.error("Error parsing registrations:", error);
      }
    }
  }, [user, isAuthenticated, navigate]);

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

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-legal-navy">My LSP Registrations</h1>
            <Button
              onClick={() => navigate("/register-lsp")}
              className="bg-legal-navy hover:bg-blue-800"
            >
              New Registration
            </Button>
          </div>

          {registrations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.id.substring(0, 8)}</TableCell>
                    <TableCell>
                      {registration.firstName} {registration.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't submitted any LSP registrations yet.</p>
              <Button
                onClick={() => navigate("/register-lsp")}
                className="bg-legal-navy hover:bg-blue-800"
              >
                Register as an LSP
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRegistrations;
