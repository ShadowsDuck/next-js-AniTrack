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

export const fetchWeeklyAnime = async () => {
  try {
    const baseUrl = typeof window === "undefined" ? process.env.BASE_URL : "";

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
