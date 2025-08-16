import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import { fetchAnime, fetchCharacter, fetchManga } from "@/server/cartoon";

type SectionType = "anime" | "manga" | "character";

interface CardSectionProps {
  type: SectionType;
}

export default async function CardSection({ type }: CardSectionProps) {
  switch (type) {
    case "anime":
      const { animeList } = await fetchAnime({
        page: 1,
        limit: 6,
      });
      return <AnimeCard animeList={animeList} />;

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
