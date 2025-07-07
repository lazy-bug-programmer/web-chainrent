import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Percent,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "12,587",
    label: "Active Users",
    change: "+15.3%",
    changeType: "positive",
  },
  {
    icon: DollarSign,
    value: "$42.8M",
    label: "Total Value Locked",
    change: "+28.7%",
    changeType: "positive",
  },
  {
    icon: Percent,
    value: "7.2%",
    label: "Average APY",
    change: "+0.8%",
    changeType: "positive",
  },
  {
    icon: Shield,
    value: "98.3%",
    label: "Security Rating",
    change: "Excellent",
    changeType: "neutral",
  },
  {
    icon: TrendingUp,
    value: "$2.1M",
    label: "Monthly Volume",
    change: "+42.1%",
    changeType: "positive",
  },
  {
    icon: Globe,
    value: "47",
    label: "Countries Served",
    change: "+3 New",
    changeType: "positive",
  },
];

export default function KeyMetrics() {
  return (
    <section id="metrics" className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
            Platform Key <span className="gradient-text">Metrics</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Real-time statistics demonstrating ChainRent&apos;s performance and
            growth
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="glass-card hover-lift group text-center"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="gradient-bg w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <metric.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 font-space-grotesk">
                  {metric.value}
                </div>

                <div className="text-gray-400 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
                  {metric.label}
                </div>

                <div
                  className={`text-xs sm:text-sm font-semibold ${
                    metric.changeType === "positive"
                      ? "text-green-400"
                      : metric.changeType === "negative"
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">
              99.9%
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">
              24/7
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">
              5 Min
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">
              100%
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">Transparency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
