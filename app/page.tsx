import CardSection from "@/components/card-section";
import HeroSection from "@/components/hero-section";
import CardSectionLoading from "@/components/loadings/card-section-loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="page-wrapper-layout !pt-8">
        {/* Anime Section */}
        <h1 className="card-text-header">Top Anime of all time</h1>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="anime" />
        </Suspense>

        {/* Manga Section */}
        <h1 className="card-text-header">Top Comic of all time</h1>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="manga" />
        </Suspense>

        {/* Character Section */}
        <h1 className="card-text-header">Top Character of all time</h1>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="character" />
        </Suspense>
      </div>
    </>
  );
}
