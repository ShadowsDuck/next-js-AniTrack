"use client";
import { useUniqueList } from "@/lib/unique-list";
// import { useQueries } from "@tanstack/react-query";
// import { fetchAnimeEpisodesQuery } from "@/lib/queryOptions/fetchData";
import Image from "next/image";
import React from "react";
import CardSectionLoading from "../loadings/card-section-loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";

interface AnimeCardProps {
  animeList?: AnimeData[];
  isPending?: boolean;
}

export default function AnimeCard({ animeList, isPending }: AnimeCardProps) {
  const uniqueAnimeList = useUniqueList(animeList);
  const textHeader = "Top Anime of all time";

  // Fetch episodes for each anime
  // const episodeQueries = useQueries({
  //   queries:
  //     uniqueAnimeList?.map((anime) =>
  //       fetchAnimeEpisodesQuery(anime.mal_id.toString()),
  //     ) || [],
  // });
  // keyword โหลดข้อมูลเฉพาะตอน hover

  if (isPending) {
    return <CardSectionLoading textHeader={textHeader} />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Finished Airing":
        return (
          <Badge variant="finish">
            <Status status="online">
              <StatusIndicator />
            </Status>
            Complete
          </Badge>
        );
      case "Currently Airing":
        return (
          <Badge variant="airing">
            <Status status="degraded">
              <StatusIndicator />
            </Status>
            Airing
          </Badge>
        );
      default:
        return (
          <Badge variant="not_yet_aired">
            <Status status="offline">
              <StatusIndicator />
            </Status>
            Not Yet Aired
          </Badge>
        );
    }
  };

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="card-layout">
        <TooltipProvider>
          {uniqueAnimeList.map((anime, index) => {
            // Get episodes data for this specific anime
            // const episodeData = episodeQueries[index]?.data || [];
            // const isEpisodesPending = episodeQueries[index]?.isPending;

            return (
              <Tooltip key={anime.mal_id} disableHoverableContent>
                <TooltipTrigger asChild>
                  <div className="card-item">
                    <div className="card-animate">
                      <div>
                        {anime.images?.jpg?.large_image_url && (
                          <Image
                            src={anime.images.jpg.large_image_url}
                            alt={anime.title || "Anime Image"}
                            width={180}
                            height={265}
                            className="w-full rounded-lg object-cover"
                            style={{
                              aspectRatio: "180/265",
                              objectFit: "cover",
                            }}
                            priority={index < 4}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        )}

                        <div className="card-text-layout">
                          <h3 className="card-text-name">
                            {anime.title || ""}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={0}
                  align="start"
                  alignOffset={10}
                  className="bg-hover"
                >
                  <div className="flex h-auto w-[320px] flex-col p-3 text-[#adc0d2]">
                    {/* Title */}
                    <p className="line-clamp-1 text-base font-bold">
                      {anime.title || ""}
                    </p>

                    {/* Status */}
                    <p className="text-[15px] font-bold">
                      {anime.status === "Finished Airing" &&
                        (anime.season
                          ? `${anime?.season?.replace(/^./, (char) =>
                              char.toUpperCase(),
                            )} ${anime?.aired?.from?.split("-")[0]}`
                          : `Finished Airing ${anime?.aired?.from?.split("-")[0]}`)}

                      {anime.status === "Currently Airing" &&
                        (anime.episodes ? "Currently Airing" : `TBA`)}
                    </p>

                    {/* Studio */}
                    <p className="text-primary mt-4 text-[13px] font-bold">
                      {anime.studios[0]?.name || "Anime Details"}
                    </p>

                    {/* Type */}
                    <p className="text-muted-foreground mt-1 text-[13px] font-semibold">
                      {`${anime.type === "TV" ? "TV Show" : anime.type}\xa0\xa0•\xa0\xa0${anime.episodes} episodes` ||
                        "Anime Details"}
                    </p>

                    {/* Genres */}
                    {anime.genres?.length > 0 && (
                      <div className="mt-4 flex flex-row gap-2">
                        {anime.genres.slice(0, 3).map((genre, index) => (
                          <Badge key={index} variant="genres">
                            <p className="text-[10px]">{genre.name}</p>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </>
  );
}
