"use client";

import CardAnime from "./card-anime";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchTopAnimeQuery,
  fetchTopMangaQuery,
} from "@/lib/queryOptions/fetchData";

export default function CardSection() {
  // const [
  //   { data: animeList, isPending: isAnimePending },
  //   { data: mangaList, isPending: isMangaPending },
  // ] = useQueries({
  //   queries: [fetchTopAnimeQuery(), fetchTopMangaQuery()],
  // });

  const { data: animeList, isPending: isAnimePending } = useQuery(
    fetchTopAnimeQuery()
  );
  const { data: mangaList, isPending: isMangaPending } = useQuery({
    ...fetchTopMangaQuery(),
    enabled: !!isAnimePending, // รอให้ anime query เสร็จก่อน
  });

  return (
    <div className="mx-auto max-w-[85rem] px-4 mb-2">
      <CardAnime
        animeList={animeList}
        isPending={isAnimePending}
        textHeader="Top Anime of all time"
      />

      <CardAnime
        animeList={mangaList}
        isPending={isMangaPending}
        textHeader="Top Manga of all time"
      />
    </div>
  );
}
