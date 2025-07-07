import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Zhang Wei",
    position: "Founder & CEO",
    avatar: "ZW",
    description:
      "Former Head of Blockchain at Ant Financial, with 10+ years of blockchain technology experience, leading multiple billion-dollar asset on-chain projects.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Elena Rodriguez",
    position: "Global Compliance Director",
    avatar: "ER",
    description:
      "Former SEC advisor with expertise in international blockchain regulations and compliance frameworks.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Kenji Tanaka",
    position: "Head of Asia Operations",
    avatar: "KT",
    description:
      "Blockchain specialist with extensive experience in the Japanese and Korean crypto markets.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-space-grotesk mb-4">
            Our Global <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experienced blockchain professionals from around the world committed
            to building a secure and reliable yield sharing platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card hover-lift group">
              <CardContent className="p-8 text-center">
                <div className="gradient-bg w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-transparent text-white text-xl font-bold">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-green-400 font-medium mb-4">
                  {member.position}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>

                <div className="flex justify-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 p-0 hover:bg-indigo-500/20"
                  >
                    <Linkedin className="h-4 w-4 text-indigo-400" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 p-0 hover:bg-blue-500/20"
                  >
                    <Twitter className="h-4 w-4 text-blue-400" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 p-0 hover:bg-gray-500/20"
                  >
                    <Github className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Info */}
        <div className="text-center">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold font-space-grotesk mb-6">
                About <span className="gradient-text">ChainRent</span>
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                ChainRent is a blockchain-based yield sharing platform that
                enables secure, transparent, and decentralized asset yield
                distribution globally. We are committed to building a
                transparent, secure, and decentralized yield distribution
                ecosystem.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">
                    2024
                  </div>
                  <div className="text-gray-400">Founded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">3</div>
                  <div className="text-gray-400">Global Offices</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text mb-2">
                    50+
                  </div>
                  <div className="text-gray-400">Team Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
