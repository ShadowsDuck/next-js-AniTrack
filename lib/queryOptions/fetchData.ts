// import {
//   fetchAnimeEpisodes,
//   fetchAnime,
//   fetchCharacter,
//   fetchManga,
// } from "@/server/cartoon";
// import { queryOptions } from "@tanstack/react-query";

// export function fetchAnimeQuery() {
//   return queryOptions({
//     queryKey: ["anime", "top", page, limit],
//     queryFn: fetchAnime({ page: 1, limit: 24 }),
//   });
// }

// export function fetchMangaQuery() {
//   return queryOptions({
//     queryKey: ["manga", "top"],
//     queryFn: fetchManga,
//   });
// }

// export function fetchCharacterQuery() {
//   return queryOptions({
//     queryKey: ["character", "top"],
//     queryFn: fetchCharacter,
//   });
// }

// export function fetchAnimeEpisodesQuery(id: string) {
//   return queryOptions({
//     queryKey: ["anime", "episodes", id],
//     queryFn: () => fetchAnimeEpisodes({ id }),
//     enabled: !!id,
//   });
// }
