import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar } from "lucide-react";

const roadmapItems = [
  {
    quarter: "2025 Q3",
    title: "Contract Audit & Public Beta",
    description:
      "Complete contract audits and first phase public testing with limited address participation, establish initial community and collect feedback.",
    status: "completed",
    items: [
      "Smart contract audit",
      "Limited beta launch",
      "Community building",
      "Feedback collection",
    ],
  },
  {
    quarter: "2025 Q4",
    title: "Mainnet Launch",
    description:
      "Mainnet goes live, open participation and on-chain yield distribution, support for multiple digital asset access.",
    status: "in-progress",
    items: [
      "Mainnet deployment",
      "Multi-asset support",
      "Yield distribution",
      "User onboarding",
    ],
  },
  {
    quarter: "2026 Q1",
    title: "Real World Assets Integration",
    description:
      "Integrate real asset yield partners, expand revenue sources, achieve real-world asset tokenization.",
    status: "planned",
    items: [
      "RWA partnerships",
      "Asset tokenization",
      "Revenue diversification",
      "Compliance framework",
    ],
  },
  {
    quarter: "2026 Q2",
    title: "Governance Token Launch",
    description:
      "Launch governance token $CRENT, achieve community governance, open a new era of decentralized governance.",
    status: "planned",
    items: [
      "$CRENT token launch",
      "DAO governance",
      "Community voting",
      "Decentralized decisions",
    ],
  },
  {
    quarter: "2026 Q3",
    title: "Cross-Chain Expansion",
    description:
      "Support multi-chain ecosystems, including Ethereum, Polygon and other mainstream blockchain networks.",
    status: "planned",
    items: [
      "Multi-chain support",
      "Bridge protocols",
      "Cross-chain yields",
      "Ecosystem expansion",
    ],
  },
  {
    quarter: "2026 Q4",
    title: "Global Compliance Expansion",
    description:
      "Complete compliance certification in major jurisdictions, achieve barrier-free access for global users.",
    status: "planned",
    items: [
      "Global compliance",
      "Regulatory approval",
      "International expansion",
      "User accessibility",
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    case "in-progress":
      return <Clock className="h-5 w-5 text-yellow-400" />;
    default:
      return <Calendar className="h-5 w-5 text-gray-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-400";
    case "in-progress":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    default:
      return "Planned";
  }
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space-grotesk mb-4">
            Development <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ChainRent&apos;s strategic planning and future development blueprint
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 hidden lg:block"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full hidden lg:block"></div>

                <div className="lg:ml-20">
                  <Card className="glass-card hover-lift">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(item.status)}
                            <h3 className="text-2xl font-semibold text-white">
                              {item.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="gradient-bg text-white">
                              {item.quarter}
                            </Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {getStatusText(item.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-3">
                        {item.items.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            {subItem}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
