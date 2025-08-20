import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { fetchAnime, fetchManga, fetchCharacter } from "@/server/cartoon";

type SectionType = "anime" | "manga" | "character";

interface PageCardContentProps {
  search: string;
  genres?: string[];
  currentPage: number;
  limit: number;
  type: SectionType;
}

export default async function PageCardContent({
  search,
  genres,
  currentPage,
  limit,
  type,
}: PageCardContentProps) {
  const getCardData = async (type: SectionType) => {
    const configs = {
      anime: async () => {
        const result = await fetchAnime({
          search,
          genres,
          page: currentPage,
          limit,
        });
        return {
          data: result.animeList,
          pagination: result.pagination,
          component: <AnimeCard animeList={result.animeList} />,
        };
      },
      manga: async () => {
        const result = await fetchManga({
          search,
          genres,
          page: currentPage,
          limit,
        });
        return {
          data: result.mangaList,
          pagination: result.pagination,
          component: <MangaCard mangaList={result.mangaList} />,
        };
      },
      character: async () => {
        const result = await fetchCharacter({
          page: currentPage,
          limit,
          search,
        });
        return {
          data: result.characterList,
          pagination: result.pagination,
          component: <CharacterCard characterList={result.characterList} />,
        };
      },
    };

    const configFn = configs[type];
    if (!configFn) {
      throw new Error(`Invalid type: ${type}`);
    }

    return await configFn();
  };

  try {
    const { data, pagination, component } = await getCardData(type);

    if (!data || data.length === 0) {
      return (
        <div className="py-16 text-center text-gray-500">No {type} found</div>
      );
    }

    return (
      <>
        {component}
        {pagination && (
          <>
            <div className="mt-4 text-sm text-gray-600">
              Page {currentPage} of {pagination?.totalPages} • Total:{" "}
              {pagination?.totalItems?.toLocaleString()} {type}s
            </div>

            <div className="mt-8">
              <PaginationWithLinks
                page={currentPage}
                pageSize={limit}
                totalCount={pagination?.totalItems}
                // navigationMode="router"
              />
            </div>
          </>
        )}
      </>
    );
  } catch {
    return (
      <div className="py-16 text-center text-red-500">
        Error loading {type} data
      </div>
    );
  }
}
