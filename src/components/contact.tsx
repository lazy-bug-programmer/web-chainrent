"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, FileText, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space-grotesk mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to start your investment journey? Contact us for personalized
            guidance and support
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Join ChainRent Community
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Subscribe to our updates to get the latest news, product
                releases, and exclusive event invitations. Our team is ready to
                answer any questions you may have.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Email
                  </h4>
                  <p className="text-gray-400">contact@chainrent.io</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Office Locations
                  </h4>
                  <p className="text-gray-400">
                    Singapore / San Francisco / Zurich
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="gradient-bg w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Documentation
                  </h4>
                  <p className="text-gray-400">docs.chainrent.io</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={5}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-bg hover:opacity-90"
                >
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
