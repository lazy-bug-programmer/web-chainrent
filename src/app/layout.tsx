import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ChainRent - Blockchain Yield Sharing Platform",
  description: "Decentralized yield distribution platform for digital assets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-gray-950 text-white antialiased`}
      >
        <Toaster />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
