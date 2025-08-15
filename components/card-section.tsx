import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import {
  fetchTopAnime,
  fetchTopCharacter,
  fetchTopManga,
} from "@/server/cartoon";

type SectionType = "anime" | "manga" | "character";

interface CardSectionProps {
  type: SectionType;
}

export default async function CardSection({ type }: CardSectionProps) {
  switch (type) {
    case "anime":
      const { animeList } = await fetchTopAnime({
        page: 1,
        limit: 6,
      });
      return <AnimeCard animeList={animeList} />;

    case "manga":
      const { mangaList } = await fetchTopManga({
        page: 1,
        limit: 6,
      });
      return <MangaCard mangaList={mangaList} />;

    case "character":
      const { characterList } = await fetchTopCharacter({
        page: 1,
        limit: 6,
      });
      return <CharacterCard characterList={characterList} />;

    default:
      return null;
  }
}
