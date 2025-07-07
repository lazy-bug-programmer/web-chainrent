/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  MessageSquare,
  Eye,
  Loader2,
} from "lucide-react";
import { AdminPageHeader } from "../layout";
import {
  Testimonial,
  TestimonialStatus,
  TestimonialRating,
} from "@/lib/domains/testimonial.domain";
import {
  adminGetAllTestimonials,
  createTestimonial,
  adminUpdateTestimonial,
  adminDeleteTestimonial,
} from "@/lib/actions/testimonial.action";
import { toast } from "sonner";

type TestimonialWithId = Testimonial & { $id: string };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<TestimonialWithId | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialWithId | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const result = await adminGetAllTestimonials();
      if (result.error) {
        toast.error(result.error);
      } else {
        setTestimonials((result.data as unknown as TestimonialWithId[]) || []);
      }
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplayName = (status: TestimonialStatus) => {
    switch (status) {
      case TestimonialStatus.ACTIVE:
        return "Published";
      case TestimonialStatus.INACTIVE:
        return "Draft";
      default:
        return "Draft";
    }
  };

  const getRatingNumber = (rating: TestimonialRating) => {
    switch (rating) {
      case TestimonialRating.ONE:
        return 1;
      case TestimonialRating.TWO:
        return 2;
      case TestimonialRating.THREE:
        return 3;
      case TestimonialRating.FOUR:
        return 4;
      case TestimonialRating.FIVE:
        return 5;
      default:
        return 5;
    }
  };

  const getRatingFromNumber = (rating: number): TestimonialRating => {
    switch (rating) {
      case 1:
        return TestimonialRating.ONE;
      case 2:
        return TestimonialRating.TWO;
      case 3:
        return TestimonialRating.THREE;
      case 4:
        return TestimonialRating.FOUR;
      case 5:
        return TestimonialRating.FIVE;
      default:
        return TestimonialRating.FIVE;
    }
  };

  const getStatusFromString = (status: string): TestimonialStatus => {
    switch (status.toLowerCase()) {
      case "published":
        return TestimonialStatus.ACTIVE;
      case "draft":
        return TestimonialStatus.INACTIVE;
      default:
        return TestimonialStatus.INACTIVE;
    }
  };

  const getAvatar = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAddTestimonial = async (formData: {
    name: string;
    position: string;
    content: string;
    rating: number;
    status: string;
  }) => {
    try {
      const testimonialData: Testimonial = {
        $id: "",
        name: formData.name,
        position: formData.position,
        content: formData.content,
        rating: getRatingFromNumber(formData.rating),
        status: getStatusFromString(formData.status),
        created_at: new Date(),
      };

      const result = await createTestimonial(testimonialData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Testimonial created successfully");
        setIsAddDialogOpen(false);
        loadTestimonials();
      }
    } catch {
      toast.error("Failed to create testimonial");
    }
  };

  const handleEditTestimonial = (testimonial: TestimonialWithId) => {
    setEditingTestimonial(testimonial);
  };

  const handleUpdateTestimonial = async (formData: {
    name: string;
    position: string;
    content: string;
    rating: number;
    status: string;
  }) => {
    if (!editingTestimonial) return;

    try {
      const updates: Partial<Testimonial> = {
        name: formData.name,
        position: formData.position,
        content: formData.content,
        rating: getRatingFromNumber(formData.rating),
        status: getStatusFromString(formData.status),
      };

      const result = await adminUpdateTestimonial(
        editingTestimonial.$id,
        updates
      );
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Testimonial updated successfully");
        setEditingTestimonial(null);
        loadTestimonials();
      }
    } catch {
      toast.error("Failed to update testimonial");
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const result = await adminDeleteTestimonial(testimonialId);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Testimonial deleted successfully");
          loadTestimonials();
        }
      } catch {
        toast.error("Failed to delete testimonial");
      }
    }
  };

  const handleStatusChange = async (
    testimonialId: string,
    newStatusString: string
  ) => {
    try {
      const newStatus = getStatusFromString(newStatusString);
      const result = await adminUpdateTestimonial(testimonialId, {
        status: newStatus,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        loadTestimonials();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: TestimonialStatus) => {
    const statusName = getStatusDisplayName(status);
    switch (statusName) {
      case "Published":
        return "bg-green-500/20 text-green-400";
      case "Draft":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <>
        <AdminPageHeader
          title="Testimonials Management"
          description="Manage client testimonials and reviews"
          icon={<MessageSquare className="h-6 w-6 text-white" />}
        />
        <div className="mx-auto container flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Testimonials Management"
        description="Manage client testimonials and reviews"
        icon={<MessageSquare className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto container">
        {/* Filters and Actions */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1"></div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-bg w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Testimonial</DialogTitle>
                  </DialogHeader>
                  <TestimonialForm onSubmit={handleAddTestimonial} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Testimonials ({testimonials.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Name</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                      Position
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Content
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Rating</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.$id}>
                      <TableCell className="text-xs sm:text-sm font-medium">
                        {testimonial.name}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell text-gray-400">
                        {testimonial.position}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm max-w-xs truncate">
                        {testimonial.content}
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(getRatingNumber(testimonial.rating))].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={getStatusDisplayName(testimonial.status)}
                          onValueChange={(value) =>
                            handleStatusChange(testimonial.$id, value)
                          }
                        >
                          <SelectTrigger className="w-28 h-8 text-xs bg-gray-800/50 border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell text-gray-400">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedTestimonial(testimonial)}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditTestimonial(testimonial)}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 h-8 w-8 p-0"
                            onClick={() =>
                              handleDeleteTestimonial(testimonial.$id)
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

        {/* Edit Testimonial Dialog */}
        {editingTestimonial && (
          <Dialog
            open={!!editingTestimonial}
            onOpenChange={() => setEditingTestimonial(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
              </DialogHeader>
              <TestimonialForm
                initialData={{
                  name: editingTestimonial.name,
                  position: editingTestimonial.position,
                  content: editingTestimonial.content,
                  rating: getRatingNumber(editingTestimonial.rating),
                  status: getStatusDisplayName(editingTestimonial.status),
                }}
                onSubmit={handleUpdateTestimonial}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* View Testimonial Dialog */}
        {selectedTestimonial && (
          <Dialog
            open={!!selectedTestimonial}
            onOpenChange={() => setSelectedTestimonial(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-2xl">
              <DialogHeader>
                <DialogTitle>Testimonial Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {getAvatar(selectedTestimonial.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {selectedTestimonial.name}
                    </h3>
                    <p className="text-green-400">
                      {selectedTestimonial.position}
                    </p>
                    <div className="flex mt-2">
                      {[
                        ...Array(getRatingNumber(selectedTestimonial.rating)),
                      ].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-400">Content</Label>
                  <div className="bg-gray-800/50 rounded-lg p-4 mt-2">
                    <p className="text-white leading-relaxed">
                      {selectedTestimonial.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(selectedTestimonial.status)}>
                    {getStatusDisplayName(selectedTestimonial.status)}
                  </Badge>
                  <span className="text-gray-400 text-sm">
                    {new Date(
                      selectedTestimonial.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

// Testimonial Form Component
function TestimonialForm({
  initialData = {},
  onSubmit,
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    position: initialData.position || "",
    content: initialData.content || "",
    rating: initialData.rating || 5,
    status: initialData.status || "Draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm">
          Name
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
        <Label htmlFor="position" className="text-sm">
          Position
        </Label>
        <Input
          id="position"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          required
        />
      </div>
      <div>
        <Label htmlFor="content" className="text-sm">
          Content
        </Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating" className="text-sm">
          Rating
        </Label>
        <Select
          value={formData.rating.toString()}
          onValueChange={(value) =>
            setFormData({ ...formData, rating: parseInt(value) })
          }
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status" className="text-sm">
          Status
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full gradient-bg text-sm">
        {initialData.name ? "Update Testimonial" : "Add Testimonial"}
      </Button>
    </form>
  );
}
