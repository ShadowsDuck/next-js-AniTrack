import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VoiceRelationSection({ people }: { people: People }) {
  if (people?.voices.length === 0)
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-muted-foreground text-sm">
          No voice actors available.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4">
      {people?.voices.map((voice: People["voices"][number]) => (
        <Link
          href={`/character/${voice.character.mal_id}`}
          key={`${voice.character.mal_id}-${voice.anime.mal_id}-${voice.role}`}
          className="group block"
        >
          <div className="hover:border-primary/50 hover:bg-muted/30 rounded-lg border p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
            <h1 className="font-semibold">{voice?.anime?.title}</h1>
            <div className="mt-3 flex gap-3">
              <figure className="card-image-wrapper h-15 w-15 flex-shrink-0 overflow-hidden rounded-full bg-black">
                {voice?.anime.images ? (
                  <Image
                    src={voice?.character?.images?.webp?.image_url}
                    alt={
                      voice?.character?.images?.webp?.image_url || "voice actor"
                    }
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    alt="placeholder"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                )}
              </figure>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="group-hover:text-primary text-base leading-tight font-medium transition-colors">
                  {voice.character.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  <span className="font-medium">{voice.role}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
