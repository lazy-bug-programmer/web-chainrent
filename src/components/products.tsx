/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Coins,
  Building,
  Gamepad2,
  Zap,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/actions/product.action";
import {
  Product,
  ProductRisk,
  ProductStatus,
  ProductCategory,
} from "@/lib/domains/product.domain";

// Helper functions to map enum values to display text
const getRiskDisplayText = (risk: ProductRisk): string => {
  switch (risk) {
    case ProductRisk.LOW:
      return "Low";
    case ProductRisk.MEDIUM:
      return "Medium";
    case ProductRisk.HIGH:
      return "High";
    case ProductRisk.VERY_HIGH:
      return "Very High";
    case ProductRisk.EXTREME:
      return "Extreme";
    default:
      return "Unknown";
  }
};

const getStatusDisplayText = (status: ProductStatus): string => {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "Active";
    case ProductStatus.INACTIVE:
      return "Inactive";
    case ProductStatus.COMING_SOON:
      return "Coming Soon";
    case ProductStatus.DISCONTINUED:
      return "Discontinued";
    default:
      return "Unknown";
  }
};

// Helper function to get icon based on category
const getCategoryIcon = (category: ProductCategory) => {
  switch (category) {
    case ProductCategory.DEFI:
      return Coins;
    case ProductCategory.RWD:
      return Building;
    case ProductCategory.NFT:
      return Gamepad2;
    default:
      return Zap;
  }
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-green-500/20 text-green-400";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";
    case "High":
    case "Very High":
    case "Extreme":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/20 text-green-400";
    case "Inactive":
      return "bg-blue-500/20 text-blue-400";
    case "Coming Soon":
      return "bg-purple-500/20 text-purple-400";
    case "Discontinued":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProducts(4); // Limit to 4 for display

        if (result.error) {
          setError(result.error);
        } else {
          // Filter for active and coming soon products only
          const displayProducts =
            result.data?.filter(
              (product: any) =>
                product.status === ProductStatus.ACTIVE ||
                product.status === ProductStatus.COMING_SOON
            ) || [];
          setProducts(displayProducts as unknown as Product[]);
        }
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
              Investment <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Diversified yield-generating products to match your risk appetite
              and investment goals
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
              Investment <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Diversified yield-generating products to match your risk appetite
              and investment goals
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
            Investment <span className="gradient-text">Products</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Diversified yield-generating products to match your risk appetite
            and investment goals
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {products.map((product) => {
              const IconComponent = getCategoryIcon(product.category);
              const riskText = getRiskDisplayText(product.risk);
              const statusText = getStatusDisplayText(product.status);
              const featuresArray = product.features
                ? product.features.split(",").map((f) => f.trim())
                : [];

              return (
                <Card key={product.$id} className="glass-card hover-lift group">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="gradient-bg w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Badge className={`${getRiskColor(riskText)} text-xs`}>
                          {riskText} Risk
                        </Badge>
                        <Badge
                          className={`${getStatusColor(statusText)} text-xs`}
                        >
                          {statusText}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                      {product.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold gradient-text">
                          {product.apy}%
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          Current APY
                        </div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white">
                          {formatCurrency(product.min_investment)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          Min. Investment
                        </div>
                      </div>
                    </div>

                    {featuresArray.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-3">
                          Key Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {featuresArray.map((feature, featureIndex) => (
                            <Badge
                              key={featureIndex}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300 text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full gradient-bg hover:opacity-90 text-sm sm:text-base"
                      disabled={product.status === ProductStatus.COMING_SOON}
                    >
                      {product.status === ProductStatus.COMING_SOON
                        ? "Coming Soon"
                        : "Invest Now"}
                      {product.status !== ProductStatus.COMING_SOON && (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
