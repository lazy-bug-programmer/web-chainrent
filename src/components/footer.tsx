import Link from "next/link";
import { Twitter, MessageCircle, Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-2xl font-bold gradient-text font-space-grotesk">
                ChainRent
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              A blockchain-based yield sharing platform enabling secure,
              transparent, and decentralized asset yield distribution globally.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-500 transition-colors"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Globe className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Platform Features
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#metrics"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Key Metrics
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Audit Reports
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 ChainRent Technologies Pte. Ltd. All rights reserved.
            ChainRent is a registered blockchain service provider in Singapore,
            USA, Switzerland, Japan, and South Korea.
          </p>
        </div>
      </div>
    </footer>
  );
}
