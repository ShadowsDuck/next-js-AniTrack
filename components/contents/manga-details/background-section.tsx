import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Info } from "lucide-react";

export default async function BackgroundSection({
  manga,
}: {
  manga: MangaData;
}) {
  if (!manga.background || manga.background.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-2xl">
            <Info size={20} />
            Background
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-32 text-center">
            No background available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-2xl">
          <Info size={20} />
          Background
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <article className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="text-muted-foreground -mt-2 flex items-center gap-1 text-base">
              {manga.background}
            </div>
          </article>
        </div>
      </CardContent>
    </Card>
  );
}
