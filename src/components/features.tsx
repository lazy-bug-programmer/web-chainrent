import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Code, Wallet, Scale, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Transparent Operations",
    description:
      "All contracts are audited by third-party firms with published reports. The project team has completed KYC and is registered in US/Singapore.",
    points: [
      "Monthly on-chain revenue reports",
      "Real-time fund pool monitoring",
      "Community verification of all transactions",
    ],
  },
  {
    icon: TrendingUp,
    title: "Real Revenue Sources",
    description:
      "All dividends come from legitimate business activities including on-chain asset leasing, DeFi protocol staking, and physical asset custody partnerships.",
    points: [
      "NFT/virtual real estate leasing",
      "Solana lending interest",
      "Tokenized physical asset returns",
    ],
  },
  {
    icon: Code,
    title: "Smart Contract Distribution",
    description:
      "Yield distribution is executed through deployed Solana smart contracts with all logic open source and community supervised.",
    points: [
      "Automated distribution mechanisms",
      "Weight-based yield allocation",
      "Fully transparent contract code",
    ],
  },
  {
    icon: Wallet,
    title: "Self-Custody Assets",
    description:
      "Users only need to keep assets in their own wallets, no need to transfer assets to platform custody, platform contracts have no asset call permissions.",
    points: [
      "Support for mainstream wallet access",
      "No custody risk",
      "Users have complete control over assets",
    ],
  },
  {
    icon: Scale,
    title: "No High Return Promises",
    description:
      "We never promise fixed or high returns, all yields are distributed according to actual business income with clear risk warnings.",
    points: [
      "Floating yield mechanism",
      "Clear risk warnings",
      "Transparent yield calculation",
    ],
  },
  {
    icon: Globe,
    title: "Global Compliance Operations",
    description:
      "Strictly comply with international blockchain regulatory standards to ensure platform compliance globally and protect user rights.",
    points: [
      "MiCA regulatory framework compliance",
      "Multi-jurisdictional compliance",
      "Data privacy protection",
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-900/30">
      <div className="mx-auto container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space-grotesk mb-4">
            Platform Core <span className="gradient-text">Features</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Built on six foundational pillars ensuring reliability and
            transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover-lift group">
              <CardContent className="p-6 sm:p-8">
                <div className="gradient-bg w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
