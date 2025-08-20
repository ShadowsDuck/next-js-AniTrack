import HeroSection from "@/components/hero-section";
import TopAnimeSection from "@/components/sections/top-anime-section";
import WeeklyAnimeSection from "@/components/sections/weekly-anime-section";
import TopMangaSection from "@/components/sections/top-manga-section";
import TopCharacterSection from "@/components/sections/top-character-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopAnimeSection />
      <WeeklyAnimeSection />
      <TopMangaSection />
      <TopCharacterSection />
    </>
  );
}
