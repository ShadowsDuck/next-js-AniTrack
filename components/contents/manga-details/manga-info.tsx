import {
  Calendar,
  Trophy,
  TrendingUp,
  Users,
  ExternalLink,
  CheckCircle,
  Tv,
  User,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import { Card } from "@/components/ui/card";
import ShareButton from "@/components/share-button";
import FavoriteButton from "@/components/favorite-button";
import { RatingStars } from "../rating-stars";

export default async function MangaInfo({ manga }: { manga: MangaData }) {
  const getStatusBadge = (status: string) => {
    const config = {
      Finished: {
        variant: "finish" as const,
        indicator: "maintenance" as const,
        title: "Finished",
      },
      Publishing: {
        variant: "airing" as const,
        indicator: "online" as const,
        title: "Ongoing",
      },
      "On Hiatus": {
        variant: "hiatus" as const,
        indicator: "degraded" as const,
        title: "Hiatus",
      },
      Discontinued: {
        variant: "not_yet_aired" as const,
        indicator: "offline" as const,
        title: "Ended",
      },
    }[status] || {
      variant: "not_yet_aired" as const,
      indicator: "offline" as const,
      title: "Upcoming",
    };

    return (
      <Badge variant={config.variant}>
        <Status status={config.indicator}>
          <StatusIndicator />
        </Status>
        {config.title}
      </Badge>
    );
  };

  return (
    <section className="page-wrapper-layout">
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Poster Section */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-6 flex flex-col items-center">
              <figure className="card-image-wrapper aspect-[2/3] w-full overflow-hidden rounded-lg bg-black sm:w-80 lg:w-full">
                {manga?.images ? (
                  <Image
                    src={
                      manga?.images?.webp?.large_image_url ||
                      manga?.images?.jpg?.large_image_url ||
                      manga?.images?.webp?.image_url ||
                      manga?.images?.jpg?.image_url
                    }
                    alt={manga?.title || "manga Image"}
                    width={400}
                    height={600}
                    priority
                    className="h-full w-full object-cover"
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

              {/* Buttons */}
              <div className="mt-6 w-full">
                {manga?.url && (
                  <Link
                    href={manga.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full bg-gradient-to-r shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View on MyAnimeList
                    </Button>
                  </Link>
                )}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <ShareButton />
                  <FavoriteButton />
                </div>
              </div>
            </div>
          </aside>

          {/* Content Section */}
          <article className="space-y-6 lg:col-span-8 xl:col-span-9">
            {/* Title Section */}
            <header className="space-y-4">
              <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl lg:text-5xl">
                {manga?.title || "Title"}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
                {manga?.title_japanese || "Title"}
              </p>

              {/* Stats Row */}
              <ul className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                <li>
                  <RatingStars rating={manga?.score || 0} size="md" />
                </li>
                <li className="text-muted-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  Ranked #{manga?.rank?.toLocaleString() || "N/A"}
                </li>
                <li className="text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Popularity #{manga?.popularity?.toLocaleString() || "N/A"}
                </li>
                <li className="text-muted-foreground flex items-center gap-2">
                  <Users className="text-primary h-4 w-4" />
                  {manga?.members?.toLocaleString() || "N/A"} members
                </li>
              </ul>
            </header>

            {/* Meta Information */}
            <section className="flex flex-wrap items-center gap-3 sm:gap-4">
              {getStatusBadge(manga?.status) || "Status"}
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(manga?.published?.from).getFullYear() || "N/A"}
              </span>
              <span className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                {manga?.authors?.[0]?.name || "N/A"}
              </span>
            </section>

            {/* Genres */}
            <section className="flex flex-wrap gap-2">
              {manga?.genres?.map((genre: Person, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-muted-foreground/20 hover:bg-muted/50 hover:border-primary/30 rounded-full px-3 py-1 text-sm transition-all"
                >
                  {genre?.name || "N/A"}
                </Badge>
              ))}
            </section>

            {/* Synopsis */}
            <section>
              <Card className="bg-muted/30 border-0 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Synopsis</h3>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {manga?.synopsis || "N/A"}
                </p>
              </Card>
            </section>

            {/* Additional Details */}
            <section className="bg-card/50 rounded-2xl border p-6 backdrop-blur-sm">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-foreground flex items-center gap-2 font-semibold">
                    <Tv className="text-primary h-4 w-4" /> Type
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {manga?.type || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground flex items-center gap-2 font-semibold">
                    <BookOpen className="text-primary h-4 w-4" /> Volumes
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {manga?.volumes || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground flex items-center gap-2 font-semibold">
                    <BookOpen className="text-primary h-4 w-4" /> Chapters
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {manga?.chapters || "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground flex items-center gap-2 font-semibold">
                    <Calendar className="text-primary h-4 w-4" /> Published
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {manga?.published?.from
                      ? `${formatDate(manga?.published?.from)} ${manga?.published?.to ? `to ${formatDate(manga?.published?.to)}` : ""}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground flex items-center gap-2 font-semibold">
                    <CheckCircle className="text-primary h-4 w-4" /> Status
                  </h4>
                  <p className="text-muted-foreground font-medium">
                    {manga?.status || "N/A"}
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </section>
  );
}
