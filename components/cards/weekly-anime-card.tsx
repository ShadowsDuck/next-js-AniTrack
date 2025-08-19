"use client";

import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface WeeklyAnimeDisplayProps {
  animeList: AnimeData[];
  day: string;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
    <span>{label}:</span>
    <p className="text-sidebar-foreground font-semibold">{value || "N/A"}</p>
  </div>
);

export default function WeeklyAnimeDisplay({
  animeList,
  day,
}: WeeklyAnimeDisplayProps) {
  const uniqueAnimeList = useUniqueList(animeList);

  const filteredAnime = uniqueAnimeList
    .filter((anime) => anime.broadcast?.day === day)
    .filter((anime) => anime.rank >= 1)
    .filter((anime) => anime.score > 0)
    .filter((anime) => anime.genres.length > 0);

  if (filteredAnime.length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">No anime airing on this day.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredAnime.map((anime, index) => (
        <motion.div
          key={anime.mal_id}
          className="group block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <article className="bg-card/60 border-border/30 hover:bg-card/80 hover:shadow-primary/20 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border p-3 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
            {/* Subtle background glow hover */}
            <div className="bg-primary/5 absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10 flex w-full gap-4">
              {anime.images?.jpg?.large_image_url && (
                <div className="relative flex-shrink-0">
                  <div className="shadow-primary/20 group-hover:shadow-primary/30 h-[7.25rem] w-20 overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-lg">
                    <Image
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title || "Anime Image"}
                      width={80}
                      height={116}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-primary/20 absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                <h3 className="text-sidebar-foreground group-hover:text-primary mb-1 line-clamp-2 text-base leading-tight font-bold transition-colors duration-300">
                  {anime.title || anime.title_english || "Title not available"}
                </h3>
                <div className="flex flex-col gap-1.5">
                  <InfoRow
                    label="Time"
                    value={`${anime.broadcast.time} (${anime.broadcast.timezone})`}
                  />
                  <InfoRow label="Type" value={anime.type} />
                  <div className="text-primary flex items-center gap-1.5 text-xs font-medium">
                    <span>Score:</span>
                    <p className="font-bold">{anime.score || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <footer className="border-border/30 relative z-10 mt-3 flex flex-wrap gap-1.5 border-t pt-2">
                {anime.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.name}
                    className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  >
                    {genre.name}
                  </span>
                ))}
                {anime.genres.length > 3 && (
                  <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                    +{anime.genres.length - 3}
                  </span>
                )}
              </footer>
            )}

            {/* Bottom accent line */}
            <div className="bg-primary/30 absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"></div>
          </article>
        </motion.div>
      ))}
    </section>
  );
}
