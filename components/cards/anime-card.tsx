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
    <div
      className={cn(
        path === "home"
          ? "grid w-full grid-cols-2 gap-4 space-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "card-layout",
      )}
    >
      {uniqueAnimeList.map((anime) => (
        <div key={anime.mal_id}>
          <div className="card-item">
            <div className="card-animate">
              {/* Wrapper สำหรับรูปภาพ */}
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

                {/* Overlay อยู่ในส่วนรูปเท่านั้น */}
                <div className="card-overlay">
                  <h2 className="overlay-title">
                    {anime.title || anime.title_english || "Title"}
                  </h2>
                  <div className="overlay-info">
                    <div>
                      <span className="font-semibold text-white">Aired:</span>{" "}
                      {formatDate(anime.aired.from)} to{" "}
                      {formatDate(anime.aired.to)}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Genres:</span>{" "}
                      {anime.genres?.map((g) => g.name).join(", ") || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Episodes:
                      </span>{" "}
                      <span>{anime.episodes || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-white">Rank:</span>{" "}
                      <span>{anime.rank || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Layout ด้านล่าง */}
              <div className="card-text-layout">
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
                    <p className="text-item">{anime.episodes}</p>
                  </div>
                  <div className="card-detail-item">
                    <Image
                      src="/icons/star.svg"
                      alt="star"
                      width={18}
                      height={18}
                      className="detail-icon"
                    />
                    <p className="text-[#f4d03f]">{anime.score}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
