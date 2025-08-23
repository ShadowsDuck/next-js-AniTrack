import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";

export default async function NewsSection({ animeId }: { animeId: string }) {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/news`,
    {
      next: {
        revalidate: 900,
      },
    },
  );

  const { data: news } = await response.json();

  if (!news || news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Newspaper size={20} />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No news available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <Newspaper size={20} />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news?.slice(0, 3).map((item: News) => (
            <article
              key={item.mal_id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.author_username}
                    </Badge>
                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 className="hover:text-primary mb-2 cursor-pointer font-medium">
                      {item.title}
                    </h4>
                  </Link>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
