"use client";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import { Star, BookOpen, Calendar, Trophy } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface MangaCardProps {
  mangaList?: MangaData[];
}

export default function MangaCarousel({ mangaList }: MangaCardProps) {
  const uniqueMangaList = useUniqueList(mangaList);

  // ใช้ useRef เก็บ instance ของ autoplay plugin
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <div className="bg-background relative rounded-lg p-6 select-none">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay.current]}
        onMouseEnter={() => autoplay.current.stop()} // หยุดตอน hover
        onMouseLeave={() => autoplay.current.play()} // เล่นต่อเมื่อ mouse leave
      >
        <CarouselContent className="-ml-2 flex items-stretch md:-ml-4">
          {uniqueMangaList.slice(0, 12).map((manga, index) => (
            <CarouselItem
              key={manga.mal_id}
              className="flex basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="group relative w-full cursor-pointer">
                <CardContent className="flex h-full flex-col p-0">
                  <div className="relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-t-lg">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Manga Image */}
                    {manga.images?.jpg?.large_image_url && (
                      <Image
                        src={manga.images.jpg.large_image_url}
                        alt={manga.title || "Manga Image"}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 6}
                      />
                    )}

                    {/* Score Badge */}
                    {manga.score && (
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                        <Star className="h-3 w-3 fill-current" />
                        {manga.score}
                      </div>
                    )}

                    {/* Rank Badge */}
                    {manga.rank && manga.rank <= 100 && (
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                        <Trophy className="h-3 w-3 fill-current" />#{manga.rank}
                      </div>
                    )}

                    {/* Overlay Content */}
                    <div className="absolute inset-0 z-20 flex translate-y-4 transform flex-col justify-end p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white drop-shadow-lg">
                          {manga.title ||
                            manga.title_english ||
                            "Unknown Title"}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-white/90">
                          {manga.chapters && (
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              <span>{manga.chapters}</span>
                            </div>
                          )}

                          {manga.published?.from && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(manga.published.from).getFullYear()}
                              </span>
                            </div>
                          )}
                        </div>

                        {manga.genres && manga.genres.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {manga.genres.slice(0, 2).map((genre) => (
                              <span
                                key={genre.name}
                                className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm"
                              >
                                {genre.name}
                              </span>
                            ))}
                            {manga.genres.length > 2 && (
                              <span className="rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
                                +{manga.genres.length - 2}
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
                    <h4 className="line-clamp-2 w-full text-center text-sm leading-tight font-semibold text-white transition-colors group-hover:text-amber-400">
                      {manga.title || manga.title_english || "Unknown Title"}
                    </h4>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Background Decoration */}
      <div className="absolute -top-4 -right-4 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="absolute -bottom-4 -left-4 -z-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl" />
    </div>
  );
}
