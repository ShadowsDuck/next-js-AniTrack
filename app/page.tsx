import CardSection from "@/components/card-section";
import HeroSection from "@/components/hero-section";
import CardContentLoading from "@/components/loadings/card-content-loading";
import TopAnimeSection from "@/components/sections/top-anime-section";
import WeeklyAnimeSection from "@/components/sections/weekly-anime-section";
import ViewAllButton from "@/components/view-all-button";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopAnimeSection />
      <WeeklyAnimeSection />

      <div className="page-wrapper-layout !pt-8">
        {/* Manga Section */}
        <div className="flex flex-row justify-between">
          <h1 className="card-text-header">Top Manga of all time</h1>
          <ViewAllButton to="/manga" />
        </div>
        <Suspense fallback={<CardContentLoading />}>
          <CardSection type="manga" />
        </Suspense>

        {/* Character Section */}
        <div className="flex flex-row justify-between">
          <h1 className="card-text-header">Top Character of all time</h1>
          <ViewAllButton to="/character" />
        </div>
        <Suspense fallback={<CardContentLoading />}>
          <CardSection type="character" />
        </Suspense>
      </div>
    </>
  );
}
