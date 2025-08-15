import AnimeCard from "@/components/cards/anime-card";
import MangaCard from "@/components/cards/manga-card";
import CharacterCard from "@/components/cards/character-card";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  fetchTopAnime,
  fetchTopManga,
  fetchTopCharacter,
} from "@/server/cartoon";

type SectionType = "anime" | "manga" | "character";

interface CardContentProps {
  currentPage: number;
  limit: number;
  type: SectionType;
}

// function PaginationSection({
//   currentPage,
//   pagination,
//   limit,
// }: {
//   currentPage: number;
//   pagination?: { totalPages: number; totalItems: number };
//   limit: number;
// }) {
//   if (!pagination) return null;

//   return (
//     <>
//       <div className="mt-4 text-sm text-gray-600">
//         Page {currentPage} of {pagination.totalPages} • Total:{" "}
//         {pagination.totalItems} items
//       </div>

//       <div className="mt-8">
//         <PaginationWithLinks
//           page={currentPage}
//           pageSize={limit}
//           totalCount={pagination.totalItems}
//           navigationMode="router"
//         />
//       </div>
//     </>
//   );
// }

export default async function CardContent({
  currentPage,
  limit,
  type,
}: CardContentProps) {
  const getCardData = async (type: SectionType) => {
    const config = {
      anime: {
        fetch: () => fetchTopAnime({ page: currentPage, limit }),
        dataKey: "animeList" as const,
        render: (data: AnimeData[]) => <AnimeCard animeList={data} />,
      },
      manga: {
        fetch: () => fetchTopManga(),
        dataKey: "mangaList" as const,
        render: (data: MangaData[]) => <MangaCard mangaList={data} />,
      },
      character: {
        fetch: () => fetchTopCharacter(),
        dataKey: "characterList" as const,
        render: (data: CharacterData[]) => (
          <CharacterCard characterList={data} />
        ),
      },
    }[type];

    if (!config) {
      throw new Error(`Invalid type: ${type}`);
    }

    const result = await config.fetch();
    return {
      data: result[config.dataKey],
      pagination: result.pagination,
      render: config.render,
    };
  };

  try {
    const { data, pagination, render } = await getCardData(type);

    if (!data || data.length === 0) {
      return (
        <div className="py-16 text-center text-gray-500">No {type} found</div>
      );
    }

    return (
      <>
        {render(data)}
        <div className="mt-4 text-sm text-gray-600">
          Page {currentPage} of {pagination?.totalPages} • Total:{" "}
          {pagination?.totalItems} items
        </div>

        <div className="mt-8">
          <PaginationWithLinks
            page={currentPage}
            pageSize={limit}
            totalCount={pagination?.totalItems}
            navigationMode="router"
          />
        </div>
        {/* <PaginationSection
          currentPage={currentPage}
          pagination={pagination}
          limit={limit}
        /> */}
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
