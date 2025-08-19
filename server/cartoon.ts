import { getCurrentSeasonRange } from "@/lib/getSeasonDate";

export const fetchAnime = async ({
  search,
  genres,
  page = 1,
  limit = 5,
}: {
  search?: string;
  genres?: string[];
  page?: number;
  limit?: number;
}) => {
  try {
    const baseUrl = typeof window === "undefined" ? process.env.BASE_URL : "";

    const params = new URLSearchParams();

    if (search) {
      params.append("q", search);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("order_by", "score");
    params.append("sort", "desc");

    const url = `${baseUrl}/api/anime?${params.toString()}`;

    const response = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const {
      data: animeList,
      pagination,
    }: { data: AnimeData[]; pagination: Pagination } = await response.json();

    return {
      animeList: animeList || [],
      pagination: {
        currentPage: pagination?.current_page || page,
        perPage: pagination?.items?.per_page || limit,
        totalItems: pagination?.items?.total || 0,
        totalPages: pagination?.last_visible_page || 0,
        hasNextPage: pagination?.has_next_page || false,
      },
    };
  } catch (error) {
    console.error("Error fetching anime:", error);
    return {
      animeList: [],
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
      },
    };
  }
};

export const fetchAnimeTrending = async () => {
  try {
    const baseUrl = typeof window === "undefined" ? process.env.BASE_URL : "";

    const params = new URLSearchParams();

    params.append("type", "tv");
    params.append("status", "airing");
    params.append("order_by", "score");
    params.append("sort", "desc");
    params.append("start_date", getCurrentSeasonRange().start_date);
    params.append("end_date", getCurrentSeasonRange().end_date);
    params.append("page", "1");
    params.append("limit", "5");

    const url = `${baseUrl}/api/anime?${params.toString()}`;

    const response = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data: topTrendingAnime }: { data: AnimeData[] } =
      await response.json();

    return {
      topTrendingAnime: topTrendingAnime || [],
    };
  } catch (error) {
    console.error("Error fetching anime:", error);
    return {
      topTrendingAnime: [],
    };
  }
};

export const fetchManga = async ({
  search,
  genres,
  page,
  limit,
}: {
  search?: string;
  genres?: string[];
  page: number;
  limit: number;
}) => {
  try {
    const baseUrl = typeof window === "undefined" ? process.env.BASE_URL : "";

    const params = new URLSearchParams();

    if (search) {
      params.append("q", search);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("order_by", "rank");
    params.append("sort", "desc");

    const url = `${baseUrl}/api/manga?${params.toString()}`;

    const response = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const {
      data: mangaList,
      pagination,
    }: { data: MangaData[]; pagination: Pagination } = await response.json();

    return {
      mangaList: mangaList || [],
      pagination: {
        currentPage: pagination?.current_page || page,
        perPage: pagination?.items?.per_page || limit,
        totalItems: pagination?.items?.total || 0,
        totalPages: pagination?.last_visible_page || 0,
        hasNextPage: pagination?.has_next_page || false,
      },
    };
  } catch (error) {
    console.error("Error fetching manga:", error);
    return {
      mangaList: [],
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
      },
    };
  }
};

export const fetchCharacter = async ({
  search,
  page,
  limit,
}: {
  search?: string;
  page: number;
  limit: number;
}) => {
  try {
    const baseUrl = typeof window === "undefined" ? process.env.BASE_URL : "";

    const params = new URLSearchParams();

    if (search) {
      params.append("q", search);
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("order_by", "favorites");
    params.append("sort", "desc");

    const url = `${baseUrl}/api/character?${params.toString()}`;

    const response = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const {
      data: characterList,
      pagination,
    }: { data: CharacterData[]; pagination: Pagination } =
      await response.json();

    return {
      characterList: characterList || [],
      pagination: {
        currentPage: pagination?.current_page || page,
        perPage: pagination?.items?.per_page || limit,
        totalItems: pagination?.items?.total || 0,
        totalPages: pagination?.last_visible_page || 0,
        hasNextPage: pagination?.has_next_page || false,
      },
    };
  } catch (error) {
    console.error("Error fetching top character:", error);
    return {
      characterList: [],
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
      },
    };
  }
};

// export const fetchAnimeEpisodes = async ({
//   id,
// }: {
//   id: string;
// }): Promise<AnimeData[]> => {
//   try {
//     const response = await fetch(`/api/anime/${id}/episodes`);

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//     const result = await response.json();

//     return result.data || [];
//   } catch (error) {
//     console.error("Error fetching top character:", error);
//     return [];
//   }
// };

// export const fetchAnime = async (): Promise<AnimeData[]> => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=5`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result.data || [];
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// export const fetchManga = async () => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const response = await fetch(`https://api.jikan.moe/v4/top/manga?limit=5`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result.data || [];
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

// แก้ไข fetchAnimeById function
// export const fetchAnime = async (): Promise<AnimeData[]> => {
//   try {
//     const response = await fetch(`/api/anime`, {
//       next: { revalidate: 0 },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result || [];
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return [];
//   }
// };

// export const fetchAnime = async (): Promise<AnimeData[]> => {
//   try {
//     const uniqueItems = new Map<number, AnimeData>();
//     const limit = 25;
//     let page = 1;
//     const maxPages = 5; // ป้องกัน infinite loop

//     while (uniqueItems.size < limit && page <= maxPages) {
//       const response = await fetch(
//         `https://api.jikan.moe/v4/top/anime?page=${page}&limit=25`,
//         {
//           // Next.js caching - revalidate ทุก 1 ชั่วโมง
//           next: {
//             revalidate: 3600,
//             tags: ["anime-top"], // สำหรับ on-demand revalidation
//           },
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 429) {
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           continue;
//         }
//         throw new Error(`Jikan API error: ${response.status}`);
//       }

//       const result = await response.json();
//       const animeData = result.data || [];

//       if (animeData.length === 0) break;

//       // เพิ่มเฉพาะ anime ที่ unique
//       animeData.forEach((anime: AnimeData) => {
//         if (anime?.mal_id && !uniqueItems.has(anime.mal_id)) {
//           uniqueItems.set(anime.mal_id, anime);
//         }
//       });

//       page++;
//     }

//     const finalResult = Array.from(uniqueItems.values()).slice(0, limit);

//     return finalResult;
//   } catch (error) {
//     console.error("Error fetching top anime:", error);
//     return [];
//   }
// };
