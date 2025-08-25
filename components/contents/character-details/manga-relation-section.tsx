import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MangaRelationSection({
  character,
}: {
  character: CharacterData;
}) {
  if (character?.manga.length === 0)
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-muted-foreground text-sm">No manga available.</p>
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {character?.manga?.map((manga: MangaRelation) => (
        <Link
          href={`/manga/${manga.manga.mal_id}`}
          key={manga.manga.mal_id}
          className="group block"
        >
          <div className="hover:border-primary/50 hover:bg-muted/30 rounded-lg border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
            <div className="flex gap-4">
              <figure className="card-image-wrapper aspect-[2/3] w-16 flex-shrink-0 overflow-hidden rounded-md bg-black">
                {manga?.manga.images ? (
                  <Image
                    src={
                      manga?.manga.images?.webp?.image_url ||
                      manga?.manga.images?.jpg?.image_url ||
                      manga?.manga.images?.webp?.large_image_url ||
                      manga?.manga.images?.jpg?.large_image_url
                    }
                    alt={manga?.manga.title || "manga Image"}
                    width={400}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    alt="placeholder"
                    width={400}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                )}
              </figure>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="group-hover:text-primary line-clamp-2 leading-tight font-medium transition-colors">
                  {manga.manga.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Role: <span className="font-medium">{manga.role}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
