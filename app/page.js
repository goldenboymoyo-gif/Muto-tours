"use client";

import { useState } from "react";
import LoadingScreen from "@/components/site/LoadingScreen";
import Navigation from "@/components/site/Navigation";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Stats from "@/components/site/Stats";
import Explore from "@/components/site/Explore";
import UltimateAdventure from "@/components/site/UltimateAdventure";
import WhyUs from "@/components/site/WhyUs";
import DestinationsCards from "@/components/site/DestinationsCards";
import Reviews from "@/components/site/Reviews";
import VideoSection from "@/components/site/VideoSection";
import Contact from "@/components/site/Contact";
import Facts from "@/components/site/Facts";
import BigFooter from "@/components/site/BigFooter";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function HomePage() {
  const { content } = useSiteContent();
  const [ready, setReady] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setReady(true)} />
      <Navigation heroReady={ready} />

      <div className="fixed-position">
        <Hero ready={ready} />
      </div>

      <div className="relative-position">
        <About brandName={content.brand.name} />
        <Stats />
        <Explore />
        <UltimateAdventure />
        <WhyUs />
        <DestinationsCards />
        <Reviews />
        <VideoSection />
        <Contact />
        <Facts />
        <BigFooter />
      </div>
    </>
  );
}
