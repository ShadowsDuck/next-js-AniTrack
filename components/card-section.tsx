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
      const animeList = await fetchTopAnime();
      return <AnimeCard animeList={animeList} />;

    case "manga":
      const mangaList = await fetchTopManga();
      return <MangaCard mangaList={mangaList} />;

    case "character":
      const characterList = await fetchTopCharacter();
      return <CharacterCard characterList={characterList} />;

    default:
      return null;
  }
}
