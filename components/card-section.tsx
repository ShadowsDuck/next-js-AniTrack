import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import {
  fetchAnime,
  fetchAnimeTrending,
  fetchCharacter,
  fetchManga,
} from "@/server/cartoon";
import SidebarAnimeCard from "./cards/sidebar-anime-card";

type SectionType = "anime" | "manga" | "character" | "animeSidebar";

interface CardSectionProps {
  type: SectionType;
  path?: string;
}

export default async function CardSection({ type, path }: CardSectionProps) {
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
        limit: 6,
      });
      return <MangaCard mangaList={mangaList} />;

    case "character":
      const { characterList } = await fetchCharacter({
        page: 1,
        limit: 6,
      });
      return <CharacterCard characterList={characterList} />;

    default:
      return null;
  }
}
