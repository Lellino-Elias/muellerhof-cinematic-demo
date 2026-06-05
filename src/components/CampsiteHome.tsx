import { PlaceholderProvider } from "@/components/ui/Placeholder";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import TrustBar from "@/components/sections/TrustBar";
import CampingFeatures from "@/components/sections/CampingFeatures";
import Mobilheime from "@/components/sections/Mobilheime";
import Kinder from "@/components/sections/Kinder";
import Aktivitaeten from "@/components/sections/Aktivitaeten";
import LageAnreise from "@/components/sections/LageAnreise";
import Galerie from "@/components/sections/Galerie";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";

export default function CampsiteHome({ theme = "cinematic" }: { theme?: string }) {
  return (
    <PlaceholderProvider>
      <SmoothScroll>
        <div data-theme={theme} className="grain relative">
          <Header />
          <main>
            <Hero />
            <BrandStatement />
            <CampingFeatures />
            <TrustBar />
            <Mobilheime />
            <Kinder />
            <LageAnreise />
            <Galerie />
            <Aktivitaeten />
            <Booking />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </PlaceholderProvider>
  );
}
