import AnimeCard from "@/components/cards/anime-card";
import {
  fetchAnime,
  fetchAnimeTrending,
  fetchCharacter,
  fetchManga,
} from "@/server/cartoon";
import SidebarAnimeCard from "./cards/sidebar-anime-card";
import MangaCarousel from "./cards/manga-carousel";
import CharacterCarousel from "./cards/character-carousel";

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
      const { topTrendingAnime } = await fetchAnimeTrending();
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
