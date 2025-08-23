import { fetchAnimeCharacters, fetchAnimeEpisodes } from "@/server/cartoon";
import { queryOptions } from "@tanstack/react-query";

export function fetchAnimeCharactersQuery({ animeId }: { animeId: string }) {
  return queryOptions({
    queryKey: ["anime", "characters", animeId],
    queryFn: () => fetchAnimeCharacters({ animeId }),
    enabled: !!animeId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

export function fetchAnimeEpisodesQuery({ animeId }: { animeId: string }) {
  return queryOptions({
    queryKey: ["anime", "episodes", animeId],
    queryFn: () => fetchAnimeEpisodes({ animeId }),
    enabled: !!animeId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}
