import AnimeCard from "@/components/cards/anime-card";
import { fetchAnime, fetchCharacter, fetchManga } from "@/server/cartoon";
import SidebarAnimeCard from "./cards/sidebar-anime-card";
import MangaCarousel from "./cards/manga-carousel";
import CharacterCarousel from "./cards/character-carousel";
import { getCurrentSeasonRange } from "@/lib/getSeasonDate";

type SectionType = "anime" | "manga" | "character" | "animeSidebar";

interface HomeCardSectionProps {
  type: SectionType;
  path?: string;
}

export default async function HomeCardSection({
  type,
  path,
}: HomeCardSectionProps) {
  switch (type) {
    case "anime":
      const { animeList } = await fetchAnime({
        page: 1,
        limit: 10,
      });
      return <AnimeCard animeList={animeList} path={path} />;

    case "animeSidebar":
      const { animeList: topTrendingAnime } = await fetchAnime({
        type: "tv",
        status: "airing",
        year: new Date().getFullYear(),
        season: getCurrentSeasonRange().season,
        page: 1,
        limit: 5,
      });
      return <SidebarAnimeCard animeList={topTrendingAnime} />;

    case "manga":
      const { mangaList } = await fetchManga({
        page: 1,
        limit: 12,
        type: "Manga",
      });
      return <MangaCarousel mangaList={mangaList} />;

    case "character":
      const { characterList } = await fetchCharacter({
        page: 1,
        limit: 12,
      });
      return <CharacterCarousel characterList={characterList} />;

    default:
      return null;
  }
}
