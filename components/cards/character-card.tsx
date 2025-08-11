import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import CardSectionLoading from "../loadings/card-section-loading";

interface CharacterCardProps {
  characterList?: CharacterData[];
  isPending?: boolean;
}

export default function CharacterCard({
  characterList,
  isPending,
}: CharacterCardProps) {
  const uniqueCharacterList = useUniqueList(characterList);
  const textHeader = "Top Characters of all time";

  if (isPending) {
    return <CardSectionLoading textHeader={textHeader} />;
  }

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="mb-[28px] grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {uniqueCharacterList.map((character, index) => {
          return (
            <div
              key={character.mal_id}
              className="relative cursor-pointer overflow-hidden rounded-lg border transition-transform duration-200 hover:scale-[1.02] hover:transform"
            >
              <div className="animate-in fade-in duration-700">
                <div className="absolute top-2 right-2 z-10 flex items-center rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                  <Image
                    src="/images/heart.svg"
                    width={12}
                    height={12}
                    alt="Heart"
                  />
                  {character.favorites.toLocaleString()}
                </div>

                {character.images?.jpg?.image_url && (
                  <Image
                    src={character.images.jpg.image_url}
                    alt={character.name || "Character Image"}
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
                    {character.name || ""}
                  </h3>
                  <p className="text-muted-foreground text-[12px]">Character</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
