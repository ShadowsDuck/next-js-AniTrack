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
      <div className="card-layout">
        {uniqueCharacterList.map((character, index) => {
          return (
            <div key={character.mal_id} className="card-item">
              <div className="card-animate">
                <div className="card-icon">
                  <Image
                    src="/icons/heart.svg"
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

                <div className="card-text-layout">
                  <h3 className="card-text-name">{character.name || ""}</h3>
                  <p className="card-text-detail">Character</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
