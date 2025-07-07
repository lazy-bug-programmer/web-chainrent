"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Wallet } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-gray-950 to-purple-900/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="mx-auto container relative z-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-space-grotesk leading-tight">
                {t("hero.title")}{" "}
                <span className="gradient-text block sm:inline">
                  {t("hero.title.highlight")}
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="gradient-bg hover:opacity-90 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              >
                {t("hero.cta.primary")}{" "}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white text-base sm:text-lg px-6 sm:px-8 bg-transparent w-full sm:w-auto"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                  $42.8M
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  Total Value Locked
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                  12,587
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  Active Users
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                  7.2%
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  Average APY
                </div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] mt-8 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Floating Cards */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 w-48 sm:w-56 lg:w-64 animate-float">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-indigo-400 mb-3 sm:mb-4" />
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">
                  Secure & Transparent
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  All contracts audited by third parties
                </p>
              </div>

              <div className="absolute top-12 sm:top-16 lg:top-20 left-0 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 w-44 sm:w-52 lg:w-56 animate-float-delayed">
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-400 mb-3 sm:mb-4" />
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">
                  Real Yield
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  From legitimate on-chain activities
                </p>
              </div>

              <div className="absolute bottom-0 right-0 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 w-46 sm:w-54 lg:w-60 animate-float-delayed-2">
                <Wallet className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-400 mb-3 sm:mb-4" />
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">
                  Self-Custody
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Users maintain full asset control
                </p>
              </div>

              {/* Connecting Lines - Hidden on mobile */}
              <svg
                className="absolute inset-0 w-full h-full hidden sm:block"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path
                  d="M200 80 L80 160 L320 320"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
