import { getFilterDateRange } from "@/lib/getSeasonDate";

export const fetchAnime = async ({
  search,
  genres,
  year,
  season,
  rating,
  type,
  status,
  page = 1,
  limit = 6,
}: FetchAnimeParams) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const params = new URLSearchParams();

    if (search) {
      params.append("q", search);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    if (year || season) {
      const { start_date, end_date } = getFilterDateRange(
        year ? new Date(year.toString()) : new Date(),
        season ?? undefined,
      );

      if (start_date && end_date) {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
      }
    }

    if (rating) {
      params.append("rating", rating);
    }

    if (type) {
      params.append("type", type);
    }

    if (status) {
      params.append("status", status);
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

export const fetchWeeklyAnime = async () => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    // สร้าง promises สำหรับทุกหน้า
    const fetchPromises = [];
    for (let page = 1; page <= 5; page++) {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "25");

      const url = `${baseUrl}/api/weekly-anime?${params.toString()}`;
      fetchPromises.push(
        fetch(url, { next: { revalidate: 900 } }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }),
      );
    }

    // รอให้ทุก request เสร็จ
    const results = await Promise.all(fetchPromises);

    // รวมข้อมูลจากทุกหน้า
    const allAnime = results.flatMap((result) => result.data || []);

    return {
      weeklyAnime: allAnime,
    };
  } catch (error) {
    console.error("Error fetching anime:", error);
    return {
      weeklyAnime: [],
    };
  }
};

export const fetchManga = async ({
  search,
  genres,
  year,
  season,
  type,
  status,
  page = 1,
  limit = 6,
}: FetchMangaParams) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const params = new URLSearchParams();

    if (search) {
      params.append("q", search);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    if (year || season) {
      const { start_date, end_date } = getFilterDateRange(
        year ? new Date(year.toString()) : new Date(),
        season ?? undefined,
      );

      if (start_date && end_date) {
        params.append("start_date", start_date);
        params.append("end_date", end_date);
      }
    }

    if (type) {
      params.append("type", type);
    }

    if (status) {
      params.append("status", status);
    }

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("order_by", "score");
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
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

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

export const fetchAnimeDetails = async ({ animeId }: { animeId: string }) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const url = `${baseUrl}/api/anime/${animeId}`;

    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch anime details");
    }

    const { data }: { data: AnimeData } = await response.json();

    return { animeDetails: data };
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return { animeDetails: null };
  }
};

export const fetchMangaDetails = async ({ mangaId }: { mangaId: string }) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const url = `${baseUrl}/api/manga/${mangaId}`;

    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch manga details");
    }

    const { data }: { data: MangaData } = await response.json();

    return { mangaDetails: data };
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return { mangaDetails: null };
  }
};

export const fetchCharacterDetails = async ({
  characterId,
}: {
  characterId: string;
}) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const url = `${baseUrl}/api/character/${characterId}`;

    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch character details");
    }

    const { data }: { data: CharacterData } = await response.json();

    return { characterDetails: data };
  } catch (error) {
    console.error("Error fetching character details:", error);
    return { characterDetails: null };
  }
};

export const fetchPeopleDetails = async ({
  peopleId,
}: {
  peopleId: string;
}) => {
  try {
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const url = `${baseUrl}/api/people/${peopleId}`;

    const response = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch people details");
    }

    const { data }: { data: People } = await response.json();

    return { peopleDetails: data };
  } catch (error) {
    console.error("Error fetching people details:", error);
    return { peopleDetails: null };
  }
};

export const fetchAnimeCharacters = async ({
  animeId,
}: {
  animeId: string;
}) => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/characters`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export const fetchAnimeEpisodes = async ({ animeId }: { animeId: string }) => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/episodes`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch episodes");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};
