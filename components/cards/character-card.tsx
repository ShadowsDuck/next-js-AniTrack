import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";

interface CharacterCardProps {
  characterList?: CharacterData[];
}

export default function CharacterCard({ characterList }: CharacterCardProps) {
  const uniqueCharacterList = useUniqueList(characterList);

  const formatFavorites = (favorites: number) => {
    if (favorites >= 1000000) {
      return `${(favorites / 1000000).toFixed(1)}M`;
    } else if (favorites >= 1000) {
      return `${(favorites / 1000).toFixed(1)}K`;
    }
    return favorites.toString();
  };

  return (
    <div className="card-layout">
      <TooltipProvider delayDuration={0}>
        {uniqueCharacterList.map((character) => (
          <Tooltip key={character.mal_id} disableHoverableContent>
            <TooltipTrigger asChild>
              <div>
                <div className="card-item">
                  <div className="card-animate">
                    <div>
                      {character.images?.jpg?.image_url && (
                        <Image
                          src={character.images.jpg.image_url}
                          alt={character.name || "Character Image"}
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
                          {character.name || "Name"}
                        </h3>
                      </div>
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
                <div className="tooltip-title-layout">
                  <div className="col-span-2">
                    <p className="line-clamp-1 text-base font-semibold">
                      {character.name || "Name"}
                    </p>
                    {character.name_kanji && (
                      <p className="line-clamp-1 text-base font-semibold">
                        {character.name_kanji}
                      </p>
                    )}
                  </div>
                  <div className="tooltip-score">
                    {character.favorites && (
                      <div className="flex flex-row items-center gap-1.5">
                        <Heart
                          className="fill-red-500 text-red-500"
                          size={18}
                        />
                        <p className="text-base font-semibold">
                          {formatFavorites(character.favorites)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {character.nicknames?.length > 0 && (
                  <div className="tooltip-genres-layout">
                    {character.nicknames.slice(0, 2).map((nickname, index) => (
                      <Badge key={index} variant="genres">
                        <p className="tooltip-genres-text">{nickname}</p>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
