// import {
//   fetchAnimeEpisodes,
//   fetchTopAnime,
//   fetchTopCharacter,
//   fetchTopManga,
// } from "@/server/cartoon";
// import { queryOptions } from "@tanstack/react-query";

// export function fetchTopAnimeQuery() {
//   return queryOptions({
//     queryKey: ["anime", "top", page, limit],
//     queryFn: fetchTopAnime({ page: 1, limit: 24 }),
//   });
// }

// export function fetchTopMangaQuery() {
//   return queryOptions({
//     queryKey: ["manga", "top"],
//     queryFn: fetchTopManga,
//   });
// }

// export function fetchTopCharacterQuery() {
//   return queryOptions({
//     queryKey: ["character", "top"],
//     queryFn: fetchTopCharacter,
//   });
// }

// export function fetchAnimeEpisodesQuery(id: string) {
//   return queryOptions({
//     queryKey: ["anime", "episodes", id],
//     queryFn: () => fetchAnimeEpisodes({ id }),
//     enabled: !!id,
//   });
// }
