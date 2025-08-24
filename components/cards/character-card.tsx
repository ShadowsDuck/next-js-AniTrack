import { useUniqueList } from "@/lib/unique-list";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Heart, BookOpen } from "lucide-react";
import Link from "next/link";

interface CharacterCardProps {
  characterList?: CharacterData[];
}

export default function CharacterCard({ characterList }: CharacterCardProps) {
  const uniqueCharacterList = useUniqueList(characterList);

  return (
    <div className="bg-background relative rounded-lg p-6 select-none">
      <div className="grid grid-cols-6 gap-2 md:gap-4">
        {uniqueCharacterList.slice(0, 24).map((character, index) => (
          <div
            key={character.mal_id}
            className="group relative w-full cursor-pointer"
          >
            <Link href={`/character/${character.mal_id}`}>
              <CardContent className="flex h-full flex-col p-0">
                <div className="relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-t-lg">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Character Image */}
                  {character.images?.jpg?.image_url && (
                    <Image
                      src={character.images.jpg.image_url}
                      alt={character.name || "Character Image"}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 6}
                    />
                  )}

                  {/* Favorites Badge */}
                  {character.favorites && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                      <Heart className="h-3 w-3 fill-current" />
                      {character.favorites >= 1000
                        ? `${(character.favorites / 1000).toFixed(1)}K`
                        : character.favorites}
                    </div>
                  )}

                  {/* Overlay Content */}
                  <div className="absolute inset-0 z-20 flex translate-y-4 transform flex-col justify-end p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="space-y-2">
                      <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white drop-shadow-lg">
                        {character.name ||
                          character.name_kanji ||
                          "Unknown Character"}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-white/90">
                        {character.about && (
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>Info</span>
                          </div>
                        )}
                      </div>

                      {character.nicknames &&
                        character.nicknames.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {character.nicknames
                              .slice(0, 2)
                              .map((nickname, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm"
                                >
                                  {nickname}
                                </span>
                              ))}
                            {character.nicknames.length > 2 && (
                              <span className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
                                +{character.nicknames.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 z-30 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </div>

                {/* Title Section */}
                <div className="bg-card/80 flex flex-grow items-center rounded-b-lg p-3">
                  <h4 className="line-clamp-2 w-full text-center text-sm leading-tight font-semibold text-white transition-colors group-hover:text-pink-400">
                    {character.name ||
                      character.name_kanji ||
                      "Unknown Character"}
                  </h4>
                </div>
              </CardContent>
            </Link>
          </div>
        ))}
      </div>

      {/* Background Decoration */}
      <div className="absolute -top-4 -right-4 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="absolute -bottom-4 -left-4 -z-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl" />
    </div>
  );
}
