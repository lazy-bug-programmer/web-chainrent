"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "features", href: "#features" },
    { key: "products", href: "#products" },
    { key: "news", href: "#news" },
    { key: "metrics", href: "#metrics" },
    { key: "roadmap", href: "#roadmap" },
    { key: "about", href: "#about" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/95 backdrop-blur-md py-2 sm:py-4"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="mx-auto container">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">
                C
              </span>
            </div>
            <span className="text-lg sm:text-2xl font-bold gradient-text font-space-grotesk">
              ChainRent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group text-sm xl:text-base"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: "en" | "zh") => setLanguage(value)}
            >
              <SelectTrigger className="w-16 sm:w-20 bg-gray-800/50 border-gray-700 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>

            <Link href="/admin" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white bg-transparent text-xs sm:text-sm"
              >
                Admin
              </Button>
            </Link>

            <Button
              size="sm"
              className="hidden sm:inline-flex gradient-bg hover:opacity-90 text-xs sm:text-sm"
            >
              Get Started
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gray-950 border-gray-800 w-72 sm:w-80"
              >
                <div className="flex flex-col space-y-6 pt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-800 space-y-4">
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-indigo-500 text-indigo-400 bg-transparent"
                      >
                        Admin Dashboard
                      </Button>
                    </Link>
                    <Button className="w-full gradient-bg">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
