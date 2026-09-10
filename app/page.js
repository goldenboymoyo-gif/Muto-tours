"use client";

import HomeHero from "@/components/site/HomeHero";
import TrustBar from "@/components/site/TrustBar";
import DiscoverZimbabwe from "@/components/site/DiscoverZimbabwe";
import SignatureExperiences from "@/components/site/SignatureExperiences";
import FeaturedJourneys from "@/components/site/FeaturedJourneys";
import WhyMuto from "@/components/site/WhyMuto";
import BeyondZimbabwe from "@/components/site/BeyondZimbabwe";
import TravellerStories from "@/components/site/TravellerStories";
import JournalTeaser from "@/components/site/JournalTeaser";
import HomeFAQ from "@/components/site/HomeFAQ";
import PlanJourneyCTA from "@/components/site/PlanJourneyCTA";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <DiscoverZimbabwe />
      <SignatureExperiences />
      <FeaturedJourneys />
      <WhyMuto />
      <BeyondZimbabwe />
      <TravellerStories />
      <JournalTeaser />
      <HomeFAQ />
      <PlanJourneyCTA />
    </>
  );
}