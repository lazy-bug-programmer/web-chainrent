"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getClients } from "@/lib/actions/client.action";
import { Client } from "@/lib/domains/client.domain";

// Helper function to generate avatar initials
const generateAvatar = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function ClientEarnings() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const result = await getClients(6); // Limit to 6 for display

        if (result.error) {
          setError(result.error);
        } else {
          setClients((result.data as unknown as Client[]) || []);
        }
      } catch {
        setError("Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/50">
        <div className="mx-auto container overflow-hidden">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
              Recent Client <span className="gradient-text">Earnings</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              See how our community members are generating consistent returns
              through our platform
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/50">
        <div className="mx-auto container overflow-hidden">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
              Recent Client <span className="gradient-text">Earnings</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              See how our community members are generating consistent returns
              through our platform
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
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-900/50">
      <div className="mx-auto container overflow-hidden">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
            Recent Client <span className="gradient-text">Earnings</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            See how our community members are generating consistent returns
            through our platform
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No client data available</p>
          </div>
        ) : (
          <div className="relative">
            {/* Gradient overlays for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-900/50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide px-4 sm:px-8">
              {clients.map((client) => (
                <Card
                  key={client.$id}
                  className="flex-shrink-0 w-64 sm:w-72 lg:w-80 glass-card hover-lift"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarFallback className="gradient-bg text-white font-semibold text-sm sm:text-base">
                          {generateAvatar(client.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                          {client.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{client.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 bg-gray-800/30 rounded-lg p-3 sm:p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Investment:</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(client.investment)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Earnings:</span>
                        <span className="text-green-400 font-semibold flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          {formatCurrency(client.earnings)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Period:</span>
                        <span className="text-white">{client.period} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
