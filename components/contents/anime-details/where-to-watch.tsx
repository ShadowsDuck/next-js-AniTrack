import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { ExternalLink, Rss } from "lucide-react";
import Link from "next/link";

export default async function WhereToWatch({ anime }: { anime: AnimeData }) {
  if (!anime.streaming || anime.streaming.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Rss size={20} />
            Where to Watch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No streaming available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <Rss size={20} />
          Where to Watch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {anime.streaming?.map((platform: Streaming, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-medium">{platform.name}</h4>
                </div>
              </div>
              <Link
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Watch
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
