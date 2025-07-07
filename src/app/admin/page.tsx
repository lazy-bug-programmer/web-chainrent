"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, DollarSign, Package } from "lucide-react";
import Link from "next/link";
import { AdminPageHeader } from "./layout";

export default function AdminDashboard() {
  return (
    <>
      <AdminPageHeader showBackToDashboard={false} />

      <div className="mx-auto container py-4 sm:py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/products">
            <Card className="glass-card hover-lift cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Package className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Manage products, including adding, editing, and deleting
                  listings.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/contacts">
            <Card className="glass-card hover-lift cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <MessageSquare className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Review and respond to contact form submissions and inquiries.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/earnings">
            <Card className="glass-card hover-lift cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <DollarSign className="h-6 w-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                  Client Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Track and update client earnings and investment returns.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/testimonials">
            <Card className="glass-card hover-lift cursor-pointer group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Package className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Manage client testimonials and reviews for the platform.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
