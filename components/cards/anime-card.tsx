import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import CardSectionLoading from "../loadings/card-section-loading";

interface AnimeCardProps {
  animeList?: AnimeData[];
  isPending?: boolean;
}

export default function AnimeCard({ animeList, isPending }: AnimeCardProps) {
  const uniqueAnimeList = useUniqueList(animeList);
  const textHeader = "Top Anime of all time";

  if (isPending) {
    return <CardSectionLoading textHeader={textHeader} />;
  }

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="mb-[28px] grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {uniqueAnimeList.map((anime, index) => {
          return (
            <div
              key={anime.mal_id}
              className="relative cursor-pointer overflow-hidden rounded-lg border transition-transform duration-200 hover:scale-[1.02] hover:transform"
            >
              <div className="animate-in fade-in duration-700">
                <div className="absolute top-2 right-2 z-10 flex items-center rounded-md bg-black/70 px-2 py-1 text-xs text-white">
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
                    className="lucide lucide-star mr-1 h-3 w-3 fill-yellow-400 text-yellow-400"
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

                <div className="space-y-1 px-3 py-3">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {anime.title || ""}
                  </h3>
                  <p className="text-muted-foreground text-[12px]">
                    {anime.aired?.from ? anime.aired.from.split("-")[0] : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
