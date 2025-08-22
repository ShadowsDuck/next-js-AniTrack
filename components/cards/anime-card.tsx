import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  animeList?: AnimeData[];
  path?: string;
}

export default function AnimeCard({ animeList, path }: AnimeCardProps) {
  const uniqueAnimeList = useUniqueList(animeList);

  return (
    <section
      className={cn(
        path === "home"
          ? "grid w-full grid-cols-2 gap-4 space-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "card-layout",
      )}
    >
      {uniqueAnimeList.map((anime) => (
        <article key={anime.mal_id} className="card-item h-fit">
          <div className="card-animate">
            {/* รูปภาพ */}
            <div className="card-image-wrapper">
              {anime.images?.jpg?.large_image_url && (
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title || "Anime Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="card-image object-cover"
                />
              )}

              {/* Overlay */}
              <header className="card-overlay">
                <h2 className="overlay-title">
                  {anime.title || anime.title_english || "Title"}
                </h2>
                <div className="overlay-info">
                  <p>
                    <span className="font-semibold text-white">Aired:</span>{" "}
                    {formatDate(anime.aired.from)} to{" "}
                    {formatDate(anime.aired.to)}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Genres:</span>{" "}
                    {anime.genres?.map((g) => g.name).join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Episodes:</span>{" "}
                    {anime.episodes || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Rank:</span>{" "}
                    {anime.rank || "N/A"}
                  </p>
                </div>
              </header>
            </div>

            {/* Text Layout */}
            <footer className="card-text-layout">
              <h3 className="card-text-name">{anime.title || "Title"}</h3>
              <div className="card-text-detail">
                <div className="card-detail-item">
                  <Image
                    src="/icons/episodes.svg"
                    alt="episodes"
                    width={18}
                    height={18}
                    className="detail-icon"
                  />
                  <p className="text-item">{anime.episodes || "N/A"}</p>
                </div>
                <div className="card-detail-item">
                  <Image
                    src="/icons/star.svg"
                    alt="star"
                    width={18}
                    height={18}
                    className="detail-icon"
                  />
                  <p className="text-[#f4d03f]">{anime.score || "N/A"}</p>
                </div>
              </div>
            </footer>
          </div>
        </article>
      ))}
    </section>
  );
}
