"use client";

import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeEpisodesQuery } from "@/lib/queryOptions/fetchData";
import { LoaderOne } from "@/components/ui/loader";
import { useState } from "react";
import { DynamicPagination } from "@/components/dynamic-pagination";

export default function EpisodesSection({ animeId }: { animeId: string }) {
  const [page, setPage] = useState(1);
  const perPage = 30;

  const {
    data: episodes,
    isPending,
    error,
  } = useQuery(fetchAnimeEpisodesQuery({ animeId }));

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <List size={20} />
            Episodes
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

  if (!episodes || episodes.length === 0 || error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <List size={20} />
            Episodes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No episodes available
          </div>
        </CardContent>
      </Card>
    );
  }

  const startIndex = (page - 1) * perPage;
  const paginatedEpisodes = episodes.slice(startIndex, startIndex + perPage);
  const totalPages = Math.ceil(episodes.length / perPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <List size={20} />
          Episodes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <main className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedEpisodes.map((episode: Episodes, index: number) => (
              <div
                className="flex flex-col gap-2 rounded-lg border p-4"
                key={episode?.mal_id}
              >
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Badge variant="outline">EP {startIndex + index + 1}</Badge>
                </h4>
                <p className="line-clamp-1 text-sm leading-relaxed font-semibold">
                  {episode?.title || "Title"}
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar size={14} color="#a0a0a0" />
                  <span className="text-muted-foreground text-[12px]">
                    {formatDate(episode?.aired || "N/A")}
                  </span>
                </p>
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
