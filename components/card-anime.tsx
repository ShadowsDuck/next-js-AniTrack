import Image from "next/image";
import React, { useMemo } from "react";
import CardAnimeLoading from "./loadings/card-anime-loading";

export default function CardAnime({
  animeList,
  isPending,
  textHeader,
}: {
  animeList?: AnimeData[];
  isPending?: boolean;
  textHeader: string;
}) {
  // Use Map for better performance with large datasets
  const uniqueAnimeList = useMemo(() => {
    if (!animeList || !Array.isArray(animeList)) return [];

    const animeMap = new Map<number, AnimeData>();

    // Map automatically handles duplicates - last item wins
    animeList.forEach((anime) => {
      if (anime?.mal_id) {
        animeMap.set(anime.mal_id, anime);
      }
    });

    return Array.from(animeMap.values());
  }, [animeList]);

  if (isPending) {
    return <CardAnimeLoading textHeader={textHeader} />;
  }

  if (!animeList || !Array.isArray(animeList)) {
    return (
      <>
        <h1 className="card-text-header">{textHeader}</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-full text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">🎭</div>
            <p>Loading anime data...</p>
          </div>
        </div>
      </>
    );
  }

  if (uniqueAnimeList.length === 0) {
    return (
      <>
        <h1 className="card-text-header">{textHeader}</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-full text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">🎭</div>
            <p>No valid anime data found.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {uniqueAnimeList.map((anime, index) => {
          return (
            <div
              key={anime.mal_id}
              className="relative rounded-lg overflow-hidden border hover:transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
            >
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star h-3 w-3 mr-1 text-yellow-400 fill-yellow-400"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                {typeof anime.score === "number" && !isNaN(anime.score)
                  ? anime.score.toFixed(1)
                  : "N/A"}
              </div>

              {anime.images?.jpg?.large_image_url && (
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title || "Anime Image"}
                  width={500}
                  height={800}
                  className="w-full object-cover"
                  style={{ aspectRatio: "500/800", objectFit: "cover" }}
                  priority={index < 4}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              )}

              <div className="px-3 py-3 space-y-1">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {anime.title || ""}
                </h3>
                <p className="text-muted-foreground text-[12px]">
                  {anime.year || ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
