import CardSection from "@/components/card-section";
import HeroSection from "@/components/hero-section";
import CardSectionLoading from "@/components/loadings/card-section-loading";
import ViewAllButton from "@/components/view-all-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="page-wrapper-layout !pt-8">
        {/* Anime Section */}
        <div className="flex flex-row justify-between">
          <h1 className="card-text-header">Top Anime of all time</h1>
          <ViewAllButton to="/anime" />
        </div>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="anime" />
        </Suspense>

        {/* Manga Section */}
        <div className="flex flex-row justify-between">
          <h1 className="card-text-header">Top Manga of all time</h1>
          <ViewAllButton to="/manga" />
        </div>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="manga" />
        </Suspense>

        {/* Character Section */}
        <div className="flex flex-row justify-between">
          <h1 className="card-text-header">Top Character of all time</h1>
          <ViewAllButton to="/character" />
        </div>
        <Suspense fallback={<CardSectionLoading />}>
          <CardSection type="character" />
        </Suspense>
      </div>
    </>
  );
}
