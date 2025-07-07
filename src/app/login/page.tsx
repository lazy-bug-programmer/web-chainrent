"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/appwrite/client";
import { setCookie } from "@/lib/utils/cookies";
import { toast } from "sonner";
import { logoutUser } from "@/lib/actions/auth.action";

export default function LoginPage() {
  const router = useRouter();
  const client = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Clear any existing session
      try {
        await client.account.deleteSession("current");
      } catch {}

      // Clear localStorage
      await logoutUser();
      localStorage.clear();

      // Create new email password session
      await client.account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      setCookie(
        "user-session",
        String(
          Object.values(JSON.parse(localStorage.getItem("cookieFallback")!))[0]
        )
      );

      toast.success("Login successfully");
      router.push("/admin");
    } catch {
      toast.error("Login failed, please try again");
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-gray-950 to-purple-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-3xl font-bold gradient-text font-space-grotesk">
              ChainRent
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="glass-card border-gray-800/50">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center text-white flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-indigo-400" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@chainrent.io"
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-bg hover:opacity-90 disabled:opacity-50 text-white font-medium py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Contact administrator
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This is a secure admin area. All activities are logged and
            monitored.
          </p>
        </div>

        {/* Back to Site */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to ChainRent
          </Link>
        </div>
      </div>
    </div>
  );
}
