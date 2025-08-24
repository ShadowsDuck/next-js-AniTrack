"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeCharactersQuery } from "@/lib/queryOptions/fetchData";
import { LoaderOne } from "@/components/ui/loader";
import { useState } from "react";
import Link from "next/link";
import { DynamicPagination } from "@/components/dynamic-pagination";

export default function CharactersSection({ animeId }: { animeId: string }) {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const {
    data: characters,
    isPending,
    error,
  } = useQuery(fetchAnimeCharactersQuery({ animeId }));

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Users size={20} />
            Characters & Voice Actors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-self-center py-32">
            <LoaderOne />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!characters || characters.length === 0 || error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Users size={20} />
            Characters & Voice Actors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No characters available
          </div>
        </CardContent>
      </Card>
    );
  }

  const startIndex = (page - 1) * perPage;
  const paginatedCharacters = characters.slice(
    startIndex,
    startIndex + perPage,
  );
  const totalPages = Math.ceil(characters.length / perPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <Users size={20} />
          Characters & Voice Actors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <main className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {paginatedCharacters?.map((character: Character) => (
              <div
                className="flex h-[143px] flex-row gap-3 rounded-lg border p-4"
                key={character?.character.mal_id}
              >
                {character.character.images.webp.image_url ||
                character.character.images.jpg.image_url ||
                character.character.images.webp.small_image_url ||
                character.character.images.jpg.small_image_url ? (
                  <Image
                    src={
                      character.character.images.webp.image_url ||
                      character.character.images.jpg.image_url ||
                      character.character.images.webp.small_image_url ||
                      character.character.images.jpg.small_image_url
                    }
                    alt={character.character.images.webp.image_url}
                    width={70}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    alt={"placeholder Image"}
                    width={70}
                    height={109}
                    className="h-[109px] w-[70px] rounded-lg object-cover"
                  />
                )}

                {/* Character Info */}
                <div className="flex flex-col gap-2">
                  <div>
                    <Link href={`/character/${character.character.mal_id}`}>
                      <p className="hover:text-primary text-base font-semibold transition-colors">
                        {character?.character?.name || "N/A"}
                      </p>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {character?.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-muted-foreground text-sm font-medium">
                      VA:
                    </p>
                    <Link href={`/people/${character.character.mal_id}`}>
                      <p className="hover:text-primary text-sm font-medium transition-colors">
                        {character.voice_actors?.[0]?.person?.name || "N/A"}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- ส่วนปุ่ม Pagination --- */}
          {totalPages > 1 && (
            <DynamicPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </main>
      </CardContent>
    </Card>
  );
}
