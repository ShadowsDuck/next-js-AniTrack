import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";

interface SidebarAnimeCardProps {
  animeList?: AnimeData[];
}

export default function SidebarAnimeCard({ animeList }: SidebarAnimeCardProps) {
  const uniqueAnimeList = useUniqueList(animeList);

  return (
    <section className="flex flex-col gap-4">
      {uniqueAnimeList.map((anime, index) => (
        <header
          key={anime.mal_id}
          className={`${index === 4 ? "hidden 2xl:block" : ""} group`}
        >
          <main className="bg-card/60 border-border/30 hover:bg-card/80 hover:shadow-primary/20 relative h-33 cursor-pointer overflow-hidden rounded-xl border p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
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
                  {/* Image overlay glow */}
                  <div className="bg-primary/20 absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                <div className="mb-2">
                  <h3 className="text-sidebar-foreground group-hover:text-primary line-clamp-1 text-sm leading-snug font-semibold transition-colors duration-300">
                    {anime.title || anime.title_english || "Title"}
                  </h3>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[12px] font-medium tracking-wide uppercase">
                      Episodes
                    </span>
                    <span className="text-sidebar-foreground bg-primary/10 rounded-md px-2 py-0.5 text-[12px] font-semibold">
                      {anime.episodes || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[12px] font-medium tracking-wide uppercase">
                      Score
                    </span>
                    <span className="text-primary bg-primary/15 rounded-md px-2 py-0.5 text-[12px] font-bold">
                      ⭐ {anime.score || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-[12px] font-medium tracking-wide uppercase">
                      Rank
                    </span>
                    <span className="text-accent-foreground bg-accent/20 rounded-md px-2 py-0.5 text-[12px] font-semibold">
                      #{anime.rank || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="bg-primary/30 absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"></div>
          </main>
        </header>
      ))}
    </section>
  );
}
