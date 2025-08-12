"use client";
import { useUniqueList } from "@/lib/unique-list";
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
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import { Frown, Meh, Smile } from "lucide-react";

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

  const getStatusBadge = (status: string) => {
    const config = {
      "Currently Airing": {
        variant: "airing" as const, // as const คือเป็นค่านี้เสมอไม่เปลี่ยนแปลง เพื่อให้ typescript รู้
        indicator: "degraded" as const,
        title: "Airing",
      },
      "Finished Airing": {
        variant: "finish" as const,
        indicator: "online" as const,
        title: "Completed",
      },
    }[status] || {
      variant: "not_yet_aired" as const,
      indicator: "offline" as const,
      title: "Not yet aired",
    };

    return (
      <Badge variant={config.variant}>
        <Status status={config.indicator}>
          <StatusIndicator />
        </Status>
        {config.title}
      </Badge>
    );
  };

  const getScoreEmoji = (score: number) => {
    const mood = score >= 7.5 ? "good" : score >= 5.5 ? "ok" : "bad";
    const { emoji } = {
      good: { emoji: <Smile className="text-[#7fdc56]" size={22} /> },
      ok: { emoji: <Meh className="text-[#f79a63]" size={22} /> },
      bad: { emoji: <Frown className="text-[#eb5e76]" size={22} /> },
    }[mood];

    return (
      <div className="flex flex-row items-center gap-1.5">
        {emoji}
        <p className="text-base font-semibold">{(score * 10).toFixed(0)}%</p>
      </div>
    );
  };

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="card-layout">
        <TooltipProvider>
          {uniqueAnimeList.map((anime) => {
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
                  className="tooltip-hover"
                >
                  <div className="tooltip-layout">
                    {/* Title */}
                    <div className="tooltip-title-layout">
                      <p className="tooltip-title-text">{anime.title || ""}</p>
                      <div className="tooltip-score">
                        {getScoreEmoji(anime.score)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="tooltip-status">
                      {getStatusBadge(anime.status)}
                    </div>

                    {/* Studio */}
                    <p className="tooltip-studio">
                      {anime.studios[0]?.name || "Anime Details"}
                    </p>

                    {/* Type */}
                    <p className="tooltip-type">
                      {`${anime.type === "TV" ? "TV Show" : anime.type}\xa0\xa0•\xa0\xa0${anime.episodes} episodes` ||
                        "Anime Details"}
                    </p>

                    {/* Genres */}
                    {anime.genres?.length > 0 && (
                      <div className="tooltip-genres-layout">
                        {anime.genres.slice(0, 3).map((genre, index) => (
                          <Badge key={index} variant="genres">
                            <p className="tooltip-genres-text">{genre.name}</p>
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
