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
  Package,
  TrendingUp,
  Eye,
  Loader2,
} from "lucide-react";
import { AdminPageHeader } from "../layout";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/product.action";
import {
  Product,
  ProductCategory,
  ProductRisk,
  ProductStatus,
} from "@/lib/domains/product.domain";

// Enum to string mappings
const categoryLabels = {
  [ProductCategory.DEFI]: "DeFi",
  [ProductCategory.RWD]: "RWA",
  [ProductCategory.NFT]: "NFT",
};

const riskLabels = {
  [ProductRisk.LOW]: "Low",
  [ProductRisk.MEDIUM]: "Medium",
  [ProductRisk.HIGH]: "High",
  [ProductRisk.VERY_HIGH]: "Very High",
  [ProductRisk.EXTREME]: "Extreme",
};

const statusLabels = {
  [ProductStatus.ACTIVE]: "Active",
  [ProductStatus.INACTIVE]: "Inactive",
  [ProductStatus.COMING_SOON]: "Coming Soon",
  [ProductStatus.DISCONTINUED]: "Discontinued",
};

interface ProductWithId extends Product {
  $id: string;
  $createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithId | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductWithId | null>(
    null
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await getProducts();
      if (result.data) {
        setProducts(result.data as unknown as ProductWithId[]);
      } else if (result.error) {
        console.error("Error loading products:", result.error);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (formData: Omit<Product, "$id">) => {
    try {
      const result = await createProduct(formData);
      if (result.data) {
        await loadProducts(); // Reload products
        setIsAddDialogOpen(false);
      } else if (result.error) {
        console.error("Error creating product:", result.error);
        alert("Failed to create product: " + result.error);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  const handleEditProduct = (product: ProductWithId) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (
    productId: string,
    formData: Partial<Product>
  ) => {
    try {
      const result = await updateProduct(productId, formData);
      if (result.data) {
        await loadProducts(); // Reload products
        setEditingProduct(null);
      } else if (result.error) {
        console.error("Error updating product:", result.error);
        alert("Failed to update product: " + result.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const result = await deleteProduct(productId);
        if (result.message) {
          await loadProducts(); // Reload products
        } else if (result.error) {
          console.error("Error deleting product:", result.error);
          alert("Failed to delete product: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const getRiskColor = (risk: ProductRisk) => {
    switch (risk) {
      case ProductRisk.LOW:
        return "bg-green-500/20 text-green-400";
      case ProductRisk.MEDIUM:
        return "bg-yellow-500/20 text-yellow-400";
      case ProductRisk.HIGH:
        return "bg-red-500/20 text-red-400";
      case ProductRisk.VERY_HIGH:
        return "bg-red-600/20 text-red-500";
      case ProductRisk.EXTREME:
        return "bg-red-800/20 text-red-600";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.ACTIVE:
        return "bg-green-500/20 text-green-400";
      case ProductStatus.INACTIVE:
        return "bg-gray-500/20 text-gray-400";
      case ProductStatus.COMING_SOON:
        return "bg-blue-500/20 text-blue-400";
      case ProductStatus.DISCONTINUED:
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <>
        <AdminPageHeader
          title="Products Management"
          description="Manage investment products and offerings"
          icon={<Package className="h-6 w-6 text-white" />}
        />
        <div className="mx-auto container flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Products Management"
        description="Manage investment products and offerings"
        icon={<Package className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto container">
        {/* Header with search and filters */}
        <Card className="glass-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-2 flex-1"></div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-bg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <ProductForm onSubmit={handleAddProduct} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Products ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Name</TableHead>
                    <TableHead className="text-xs sm:text-sm">APY</TableHead>
                    <TableHead className="text-xs sm:text-sm">Risk</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                      Min Investment
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                      Investors
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden xl:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.$id}>
                      <TableCell className="text-xs sm:text-sm font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm font-semibold text-green-400">
                        {product.apy}%
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getRiskColor(
                            product.risk as ProductRisk
                          )}`}
                        >
                          {riskLabels[product.risk as ProductRisk]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                        ${product.min_investment.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                        {product.investors}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            product.status as ProductStatus
                          )}`}
                        >
                          {statusLabels[product.status as ProductStatus]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden xl:table-cell">
                        {categoryLabels[product.category as ProductCategory]}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 h-8 w-8 p-0"
                            onClick={() => handleDeleteProduct(product.$id)}
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

        {/* Edit Product Dialog */}
        {editingProduct && (
          <Dialog
            open={!!editingProduct}
            onOpenChange={() => setEditingProduct(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                initialData={editingProduct}
                onSubmit={(data) =>
                  handleUpdateProduct(editingProduct.$id, data)
                }
              />
            </DialogContent>
          </Dialog>
        )}

        {/* View Product Dialog */}
        {selectedProduct && (
          <Dialog
            open={!!selectedProduct}
            onOpenChange={() => setSelectedProduct(null)}
          >
            <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Product Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedProduct.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400 font-semibold">
                          {selectedProduct.apy}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level:</span>
                        <Badge
                          className={getRiskColor(
                            selectedProduct.risk as ProductRisk
                          )}
                        >
                          {riskLabels[selectedProduct.risk as ProductRisk]}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white">
                          {
                            categoryLabels[
                              selectedProduct.category as ProductCategory
                            ]
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge
                          className={getStatusColor(
                            selectedProduct.status as ProductStatus
                          )}
                        >
                          {
                            statusLabels[
                              selectedProduct.status as ProductStatus
                            ]
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-3">
                        Investment Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Min Investment:</span>
                          <span className="text-white">
                            ${selectedProduct.min_investment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Investment:</span>
                          <span className="text-white">
                            ${selectedProduct.max_investment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">
                            Active Investors:
                          </span>
                          <span className="text-white">
                            {selectedProduct.investors}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created:</span>
                          <span className="text-white">
                            {new Date(
                              selectedProduct.$createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Features</h4>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-300">{selectedProduct.features}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

// Product Form Component
function ProductForm({
  initialData,
  onSubmit,
}: {
  initialData?: ProductWithId;
  onSubmit: (data: Omit<Product, "$id">) => void;
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    apy: initialData?.apy?.toString() || "",
    risk: initialData?.risk || ProductRisk.LOW,
    min_investment: initialData?.min_investment?.toString() || "",
    max_investment: initialData?.max_investment?.toString() || "",
    investors: initialData?.investors?.toString() || "0",
    status: initialData?.status || ProductStatus.ACTIVE,
    category: initialData?.category || ProductCategory.DEFI,
    features: initialData?.features || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      apy: parseFloat(formData.apy) || 0,
      risk: formData.risk,
      min_investment: parseInt(formData.min_investment) || 0,
      max_investment: parseInt(formData.max_investment) || 0,
      investors: parseInt(formData.investors) || 0,
      status: formData.status,
      category: formData.category,
      features: formData.features,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm">
            Product Name
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
          <Label htmlFor="category" className="text-sm">
            Category
          </Label>
          <Select
            value={formData.category.toString()}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                category: parseInt(value) as ProductCategory,
              })
            }
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProductCategory.DEFI.toString()}>
                DeFi
              </SelectItem>
              <SelectItem value={ProductCategory.RWD.toString()}>
                RWA
              </SelectItem>
              <SelectItem value={ProductCategory.NFT.toString()}>
                NFT
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="apy" className="text-sm">
            APY (%)
          </Label>
          <Input
            id="apy"
            type="number"
            step="0.1"
            value={formData.apy}
            onChange={(e) => setFormData({ ...formData, apy: e.target.value })}
            className="bg-gray-800 border-gray-700 text-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="risk" className="text-sm">
            Risk Level
          </Label>
          <Select
            value={formData.risk.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, risk: parseInt(value) as ProductRisk })
            }
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProductRisk.LOW.toString()}>Low</SelectItem>
              <SelectItem value={ProductRisk.MEDIUM.toString()}>
                Medium
              </SelectItem>
              <SelectItem value={ProductRisk.HIGH.toString()}>High</SelectItem>
              <SelectItem value={ProductRisk.VERY_HIGH.toString()}>
                Very High
              </SelectItem>
              <SelectItem value={ProductRisk.EXTREME.toString()}>
                Extreme
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status" className="text-sm">
            Status
          </Label>
          <Select
            value={formData.status.toString()}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                status: parseInt(value) as ProductStatus,
              })
            }
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ProductStatus.ACTIVE.toString()}>
                Active
              </SelectItem>
              <SelectItem value={ProductStatus.INACTIVE.toString()}>
                Inactive
              </SelectItem>
              <SelectItem value={ProductStatus.COMING_SOON.toString()}>
                Coming Soon
              </SelectItem>
              <SelectItem value={ProductStatus.DISCONTINUED.toString()}>
                Discontinued
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="minInvestment" className="text-sm">
            Minimum Investment
          </Label>
          <Input
            id="minInvestment"
            type="number"
            value={formData.min_investment}
            onChange={(e) =>
              setFormData({ ...formData, min_investment: e.target.value })
            }
            className="bg-gray-800 border-gray-700 text-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="maxInvestment" className="text-sm">
            Maximum Investment
          </Label>
          <Input
            id="maxInvestment"
            type="number"
            value={formData.max_investment}
            onChange={(e) =>
              setFormData({ ...formData, max_investment: e.target.value })
            }
            className="bg-gray-800 border-gray-700 text-sm"
            required
          />
        </div>
        <div>
          <Label htmlFor="investors" className="text-sm">
            Current Investors
          </Label>
          <Input
            id="investors"
            type="number"
            value={formData.investors}
            onChange={(e) =>
              setFormData({ ...formData, investors: e.target.value })
            }
            className="bg-gray-800 border-gray-700 text-sm"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="features" className="text-sm">
          Features Description
        </Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value })
          }
          className="bg-gray-800 border-gray-700 text-sm"
          rows={3}
          placeholder="Describe the key features and benefits of this product..."
          required
        />
      </div>

      <Button type="submit" className="w-full gradient-bg text-sm">
        {initialData ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
