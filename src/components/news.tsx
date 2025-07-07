/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ExternalLink,
  TrendingUp,
  Building,
  PieChart,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  category: string;
  icon: any;
  url: string;
}

interface ApiNewsItem {
  id: string;
  title: string;
  body: string;
  published_on: number;
  source_info: {
    name: string;
  };
  categories: string;
  url: string;
}

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 7500 },
];

const getCategoryIcon = (categories: string) => {
  if (categories.includes("REGULATION")) return Building;
  if (categories.includes("TRADING") || categories.includes("MARKET"))
    return TrendingUp;
  return PieChart;
};

const getCategoryName = (categories: string) => {
  if (categories.includes("REGULATION")) return "Regulation";
  if (categories.includes("TRADING")) return "Trading";
  if (categories.includes("MARKET")) return "Market";
  if (categories.includes("BTC")) return "Bitcoin";
  if (categories.includes("ETH")) return "Ethereum";
  if (categories.includes("DEFI")) return "DeFi";
  return "Crypto";
};

const transformApiData = (apiData: ApiNewsItem[]): NewsItem[] => {
  return apiData.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.body.substring(0, 150) + "...",
    date: new Date(item.published_on * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    source: item.source_info.name,
    category: getCategoryName(item.categories),
    icon: getCategoryIcon(item.categories),
    url: item.url,
  }));
};

export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();

        if (data.Type === 100 && data.Data) {
          const transformedData = transformApiData(data.Data);
          setNewsData(transformedData);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError("Failed to load latest news. Please try again later.");
        console.error("News fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="news" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space-grotesk mb-4">
            Latest <span className="gradient-text">News & Analytics</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the most recent developments in the blockchain
            ecosystem
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                      <div className="w-16 h-6 bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded mb-3 w-3/4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="h-3 bg-gray-700 rounded w-20"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-gray-700 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-red-400 text-center mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              >
                Try Again
              </Button>
            </div>
          ) : (
            // News articles
            newsData.map((article) => (
              <Card key={article.id} className="glass-card hover-lift group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <article.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300"
                    >
                      {article.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-white line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                    <span>{article.source}</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-indigo-400 hover:text-white hover:bg-indigo-500/20"
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    Read More <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* DeFi Chart */}
        <Card className="glass-card">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">
                DeFi Market Trends
              </h3>
              <Badge className="bg-green-500/20 text-green-400">
                +24.5% This Month
              </Badge>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
