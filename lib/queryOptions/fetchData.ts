import { queryOptions } from "@tanstack/react-query";
import { fetchTopAnime, fetchTopManga } from "../anime";

export function fetchTopAnimeQuery() {
  return queryOptions({
    queryKey: ["anime", "top"],
    queryFn: fetchTopAnime,
  });
}

export function fetchTopMangaQuery() {
  return queryOptions({
    queryKey: ["manga", "top"],
    queryFn: fetchTopManga,
  });
}
