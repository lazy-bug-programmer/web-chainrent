"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/appwrite/client";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface AdminPageHeaderProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showBackToDashboard?: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { account } = createClient();
      await account.deleteSession("current");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="mx-auto container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">
                    C
                  </span>
                </div>
                <span className="text-lg sm:text-xl font-bold gradient-text">
                  ChainRent Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-500 text-indigo-400 bg-transparent text-xs sm:text-sm"
                >
                  Back to Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-500 text-red-400 bg-transparent text-xs sm:text-sm hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  icon,
  showBackToDashboard = true,
}: AdminPageHeaderProps) {
  return (
    <div className="mx-auto container py-4 sm:py-8">
      {showBackToDashboard && (
        <div className="mb-6">
          <Link
            href="/admin"
            className="flex items-center space-x-2 text-gray-400 hover:text-white w-fit"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      )}

      {(title || description || icon) && (
        <div className="flex items-center gap-4 mb-8">
          {icon && (
            <div className="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center">
              {icon}
            </div>
          )}
          {(title || description) && (
            <div>
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk">
                  {title}
                </h1>
              )}
              {description && <p className="text-gray-400">{description}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
