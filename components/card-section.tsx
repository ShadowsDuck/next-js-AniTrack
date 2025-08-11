"use client";

import { useQueries } from "@tanstack/react-query";
import {
  fetchTopAnimeQuery,
  fetchTopCharacterQuery,
  fetchTopMangaQuery,
} from "@/lib/queryOptions/fetchData";
import AnimeCard from "./cards/anime-card";
import MangaCard from "./cards/manga-card";
import CharacterCard from "./cards/character-card";

export default function CardSection() {
  const [
    { data: animeList, isPending: isAnimePending },
    { data: mangaList, isPending: isMangaPending },
    { data: characterList, isPending: isCharacterPending },
  ] = useQueries({
    queries: [
      fetchTopAnimeQuery(),
      fetchTopMangaQuery(),
      fetchTopCharacterQuery(),
    ],
  });

  return (
    <div className="mx-auto mb-2 max-w-[85rem] px-4">
      <AnimeCard animeList={animeList} isPending={isAnimePending} />

      <MangaCard mangaList={mangaList} isPending={isMangaPending} />

      <CharacterCard
        characterList={characterList}
        isPending={isCharacterPending}
      />
    </div>
  );
}
