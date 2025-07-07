/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { AdminPageHeader } from "../layout";
import { Client } from "@/lib/domains/client.domain";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "@/lib/actions/client.action";

export default function EarningsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const result = await getClients();
      if (result.error) {
        setError(result.error);
      } else {
        setClients((result.data as unknown as Client[]) || []);
      }
    } catch {
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddClient = async (formData: Omit<Client, "$id">) => {
    try {
      const result = await createClient(formData);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchClients();
        setIsAddDialogOpen(false);
      }
    } catch {
      setError("Failed to create client");
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  const handleUpdateClient = async (updates: Partial<Client>) => {
    if (!editingClient?.$id) return;

    try {
      const result = await updateClient(editingClient.$id, updates);
      if (result.error) {
        setError(result.error);
      } else {
        await fetchClients();
        setEditingClient(null);
      }
    } catch {
      setError("Failed to update client");
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (confirm("Are you sure you want to delete this client record?")) {
      try {
        const result = await deleteClient(clientId);
        if (result.error) {
          setError(result.error);
        } else {
          await fetchClients();
        }
      } catch {
        setError("Failed to delete client");
      }
    }
  };

  const calculateROI = (earnings: number, investment: number) => {
    if (investment === 0) return 0;
    return (earnings / investment) * 100;
  };

  const getStatusColor = (earnings: number, investment: number) => {
    const roi = calculateROI(earnings, investment);
    if (roi >= 10) return "bg-green-500/20 text-green-400";
    if (roi >= 5) return "bg-yellow-500/20 text-yellow-400";
    return "bg-blue-500/20 text-blue-400";
  };

  const getStatus = (earnings: number, investment: number) => {
    const roi = calculateROI(earnings, investment);
    if (roi >= 10) return "High Performance";
    if (roi >= 5) return "Good Performance";
    return "Standard Performance";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Client Earnings"
        description="Track and manage client investment returns"
        icon={<DollarSign className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto container">
        {error && (
          <Card className="glass-card mb-6 border-red-500/20">
            <CardContent className="p-4">
              <p className="text-red-400 text-sm">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="mt-2"
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-bg w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Client Record</DialogTitle>
                  </DialogHeader>
                  <ClientForm onSubmit={handleAddClient} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Client Earnings ({filteredClients.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Client</TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Location
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Investment
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Earnings
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                      ROI
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                      Period
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Performance
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.$id}>
                      <TableCell className="text-xs sm:text-sm font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-400">
                        {client.location}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm font-semibold">
                        ${client.investment.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-green-400 font-semibold">
                        ${client.earnings.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell font-semibold">
                        {calculateROI(
                          client.earnings,
                          client.investment
                        ).toFixed(2)}
                        %
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell text-gray-400">
                        {client.period} days
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            client.earnings,
                            client.investment
                          )}`}
                        >
                          {getStatus(client.earnings, client.investment)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 h-8 w-8 p-0"
                            onClick={() =>
                              client.$id && handleDeleteClient(client.$id)
                            }
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Client Dialog */}
        {editingClient && (
          <Dialog
            open={!!editingClient}
            onOpenChange={() => setEditingClient(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Client Record</DialogTitle>
              </DialogHeader>
              <ClientForm
                initialData={editingClient}
                onSubmit={handleUpdateClient}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

// Client Form Component
function ClientForm({
  initialData = {},
  onSubmit,
}: {
  initialData?: Partial<Client>;
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    location: initialData.location || "",
    investment: initialData.investment?.toString() || "",
    earnings: initialData.earnings?.toString() || "",
    period: initialData.period?.toString() || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      investment: Number.parseFloat(formData.investment) || 0,
      earnings: Number.parseFloat(formData.earnings) || 0,
      period: Number.parseInt(formData.period) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm">
          Client Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-sm">
          Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <div>
        <Label htmlFor="investment" className="text-sm">
          Investment Amount
        </Label>
        <Input
          id="investment"
          type="number"
          step="0.01"
          value={formData.investment}
          onChange={(e) =>
            setFormData({ ...formData, investment: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <div>
        <Label htmlFor="earnings" className="text-sm">
          Earnings Amount
        </Label>
        <Input
          id="earnings"
          type="number"
          step="0.01"
          value={formData.earnings}
          onChange={(e) =>
            setFormData({ ...formData, earnings: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <div>
        <Label htmlFor="period" className="text-sm">
          Period (days)
        </Label>
        <Input
          id="period"
          type="number"
          value={formData.period}
          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <Button type="submit" className="w-full gradient-bg text-sm">
        {initialData.$id ? "Update Record" : "Add Record"}
      </Button>
    </form>
  );
}
