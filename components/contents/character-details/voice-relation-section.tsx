import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VoiceRelationSection({
  character,
}: {
  character: CharacterData;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {character?.voices?.map((voice: VoiceActor) => (
        <Link
          href={`/people/${voice.person.mal_id}`}
          key={voice.person.mal_id}
          className="group block"
        >
          <div className="hover:border-primary/50 hover:bg-muted/30 rounded-lg border p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
            <div className="flex gap-4">
              <figure className="card-image-wrapper aspect-[2/3] w-16 flex-shrink-0 overflow-hidden rounded-md bg-black">
                {voice?.person.images ? (
                  <Image
                    src={voice?.person.images?.jpg?.image_url}
                    alt={voice?.person.name || "voice actor"}
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
                <h3 className="group-hover:text-primary leading-tight font-medium transition-colors">
                  {voice.person.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Language:{" "}
                  <span className="font-medium">{voice.language}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
