import { queryOptions } from "@tanstack/react-query";
import {
  fetchAnimeEpisodes,
  fetchTopAnime,
  fetchTopCharacter,
  fetchTopManga,
} from "../cartoon";

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

export function fetchTopCharacterQuery() {
  return queryOptions({
    queryKey: ["character", "top"],
    queryFn: fetchTopCharacter,
  });
}

export function fetchAnimeEpisodesQuery(id: string) {
  return queryOptions({
    queryKey: ["anime", "episodes", id],
    queryFn: () => fetchAnimeEpisodes({ id }),
    enabled: !!id,
  });
}
