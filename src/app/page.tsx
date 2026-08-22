import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AppPreview from "@/components/app-preview";
import Features from "@/components/features";
import WhyCultiva from "@/components/why-cultiva";
import HowItWorks from "@/components/how-it-works";
import Statistics from "@/components/statistics";
import Roadmap from "@/components/roadmap";
import Team from "@/components/team";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AppPreview />
      <Features />
      <WhyCultiva />
      <HowItWorks />
      <Statistics />
      <Roadmap />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
