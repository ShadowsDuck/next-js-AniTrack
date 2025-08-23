import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tag } from "lucide-react";

export default async function RelatedSection({ animeId }: { animeId: string }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/relations`,
    {
      next: {
        revalidate: 900,
      },
    },
  );

  const { data: relations } = await response.json();

  if (!relations || relations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Tag size={20} />
            Related Anime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No related anime available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <Tag size={20} />
          Related Anime
        </CardTitle>
      </CardHeader>
      <CardContent>
        <main className="space-y-4">
          <div className="-mt-2 flex flex-col gap-6">
            {relations?.map((relation: Relation) => (
              <div key={relation?.relation} className="flex flex-col gap-3">
                <h1 className="text-lg font-bold">{relation?.relation}</h1>

                <div className="flex flex-col flex-wrap gap-4 md:flex-row">
                  {relation?.entry?.map((entry) => (
                    <Link
                      key={entry.mal_id}
                      href={
                        entry.type === "anime"
                          ? `/anime/${entry.mal_id}`
                          : `/manga/${entry.mal_id}`
                      }
                    >
                      <div className="hover:border-primary flex w-full flex-col rounded-lg border px-4 py-3 transition-all duration-300 hover:scale-[1.03] md:w-72">
                        <h4 className="text-foreground flex items-center font-semibold">
                          {entry.name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {entry.type.charAt(0).toUpperCase() +
                            entry.type.slice(1)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </CardContent>
    </Card>
  );
}
