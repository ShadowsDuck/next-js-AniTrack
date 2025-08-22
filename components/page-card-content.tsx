import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { fetchAnime, fetchManga, fetchCharacter } from "@/server/cartoon";

export default async function PageCardContent({
  search,
  genres,
  year,
  season,
  rating,
  type,
  status,
  page,
  limit,
  cartoonType,
}: PageCardContentProps) {
  const getCardData = async (cartoonType: SectionType) => {
    const configs = {
      anime: async () => {
        const result = await fetchAnime({
          search,
          genres,
          year,
          season,
          rating,
          type: type as AnimeType,
          status: status as AnimeStatus,
          page,
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
          year,
          season,
          type: type as MangaType,
          status: status as MangaStatus,
          page,
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
          page,
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

    const configFn = configs[cartoonType];
    if (!configFn) {
      throw new Error(`Invalid type: ${cartoonType}`);
    }

    return await configFn();
  };

  try {
    const { data, pagination, component } = await getCardData(cartoonType);

    if (!data || data.length === 0) {
      return (
        <div className="py-16 text-center text-gray-500">
          No {cartoonType} found
        </div>
      );
    }

    return (
      <>
        {component}
        {pagination && (
          <>
            <div className="mt-4 text-sm text-gray-600">
              Page {page} of {pagination?.totalPages} • Total:{" "}
              {pagination?.totalItems?.toLocaleString()} {cartoonType}s
            </div>

            <div className="mt-8">
              <PaginationWithLinks
                page={page}
                pageSize={limit}
                totalCount={pagination?.totalItems}
                // navigationMode="router"
              />
            </div>
          </>
        )}
      </>
    );
  } catch (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Error loading {cartoonType} data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
}
