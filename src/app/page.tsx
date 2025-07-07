import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ClientEarnings from "@/components/client-earnings";
import Testimonials from "@/components/testimonials";
import Features from "@/components/features";
import Products from "@/components/products";
import News from "@/components/news";
import KeyMetrics from "@/components/key-metrics";
import Roadmap from "@/components/roadmap";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main>
        <HeroSection />
        <ClientEarnings />
        <Testimonials />
        <Features />
        <Products />
        <News />
        <KeyMetrics />
        <Roadmap />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
