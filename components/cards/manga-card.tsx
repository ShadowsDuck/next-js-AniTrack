import { useUniqueList } from "@/lib/unique-list";
import Image from "next/image";
import React from "react";
import CardSectionLoading from "../loadings/card-section-loading";

interface MangaCardProps {
  mangaList?: MangaData[];
  isPending?: boolean;
}

export default function MangaCard({ mangaList, isPending }: MangaCardProps) {
  const uniqueMangaList = useUniqueList(mangaList);
  const textHeader = "Top Manga of all time";

  if (isPending) {
    return <CardSectionLoading textHeader={textHeader} />;
  }

  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="card-layout">
        {uniqueMangaList.map((manga, index) => {
          return (
            <div key={manga.mal_id} className="card-item">
              <div className="card-animate">
                <div className="card-icon">
                  <Image
                    src="/icons/star.svg"
                    alt="Star Icon"
                    width={12}
                    height={12}
                  />
                  <p className="mt-[1px]">
                    {typeof manga.score === "number" && !isNaN(manga.score)
                      ? manga.score.toFixed(1)
                      : "N/A"}
                  </p>
                </div>

                {manga.images?.jpg?.large_image_url && (
                  <Image
                    src={manga.images.jpg.large_image_url}
                    alt={manga.title || "Manga Image"}
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
                  <h3 className="card-text-name">{manga.title || ""}</h3>
                  <p className="card-text-detail">
                    {manga.published?.from
                      ? manga.published.from.split("-")[0]
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
