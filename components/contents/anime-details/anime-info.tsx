import {
  Play,
  Calendar,
  Clock,
  Building,
  Trophy,
  TrendingUp,
  Users,
  ExternalLink,
  CheckCircle,
  Tv,
  Leaf,
} from "lucide-react";

import { RatingStars } from "../rating-stars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { Status, StatusIndicator } from "@/components/ui/shadcn-io/status";
import { Card } from "@/components/ui/card";
import ShareButton from "@/components/share-button";
import FavoriteButton from "@/components/favorite-button";

export default async function AnimeInfo({ anime }: { anime: AnimeData }) {
  const getStatusBadge = (status: string) => {
    const config = {
      "Finished Airing": {
        variant: "finish" as const, // as const คือเป็นค่านี้เสมอไม่เปลี่ยนแปลง เพื่อให้ typescript รู้
        indicator: "maintenance" as const,
        title: "Finished Airing",
      },
      "Currently Airing": {
        variant: "airing" as const,
        indicator: "online" as const,
        title: "Currently Airing",
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
    <section className="page-wrapper-layout !pt-10">
      <main className="container grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Poster Section */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-6 flex flex-col items-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="group relative cursor-pointer">
                  <div className="card-image-wrapper aspect-[2/3] w-full overflow-hidden rounded-lg bg-black sm:w-80 lg:w-full">
                    {anime?.images ? (
                      <Image
                        src={
                          anime?.images?.webp?.large_image_url ||
                          anime?.images?.jpg?.large_image_url ||
                          anime?.images?.webp?.image_url ||
                          anime?.images?.jpg?.image_url
                        }
                        alt={anime?.title || "anime Image"}
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
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-black/40 p-4 transition-transform duration-300 hover:scale-110">
                      <Play className="h-12 w-12 fill-current text-white" />
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogTitle />
              <DialogContent className="w-full !max-w-3xl p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src={anime?.trailer?.embed_url}
                    title="Anime Trailer"
                    className="h-full w-full rounded-lg"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Button */}
            <div className="mt-6 flex w-full flex-col">
              {anime?.url && (
                <Link
                  href={anime?.url}
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
        </div>

        {/* Content Section */}
        <div className="space-y-6 lg:col-span-8 xl:col-span-9">
          {/* Title Section */}
          <div className="space-y-4">
            <div>
              <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl lg:text-5xl">
                {anime?.title || "Title"}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
                {anime?.title_japanese || "Title"}
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="flex items-center">
                <RatingStars rating={anime?.score || 0} size="md" />
              </div>
              <div className="bg-border hidden h-4 w-px sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  Ranked #{anime?.rank?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="bg-border hidden h-4 w-px sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">
                  Popularity #{anime?.popularity?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="bg-border hidden h-4 w-px lg:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Users className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  {anime?.members?.toLocaleString() || "N/A"} members
                </span>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {getStatusBadge(anime?.status) || "Status"}
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {new Date(anime?.aired?.from).getFullYear() || "N/A"}
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {anime?.duration || "N/A"}
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium">
                {anime?.studios?.[0]?.name || "N/A"}
              </span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime?.genres?.map((genre: Person, index: number) => (
              <Badge
                variant="outline"
                key={index}
                className="border-muted-foreground/20 hover:bg-muted/50 hover:border-primary/30 rounded-full px-3 py-1 text-sm transition-all"
              >
                {genre?.name || "N/A"}
              </Badge>
            ))}
          </div>

          {/* Synopsis */}
          <Card className="bg-muted/30 border-0 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">Synopsis</h3>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {anime?.synopsis || "N/A"}
            </p>
          </Card>

          {/* Additional Details */}
          <div className="bg-card/50 rounded-2xl border p-6 backdrop-blur-sm">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Row 1: Type, Episodes, Status */}
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Tv className="text-primary h-4 w-4" />
                  Type
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.type || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Play className="text-primary h-4 w-4" />
                  Episodes
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.episodes || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <CheckCircle className="text-primary h-4 w-4" />
                  Status
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.status || "N/A"}
                </p>
              </div>

              {/* Row 2: Aired, Duration, Season */}
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Calendar className="text-primary h-4 w-4" />
                  Aired
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.aired?.from
                    ? `${formatDate(anime?.aired?.from)} 
                      ${anime?.aired?.to ? `to ${formatDate(anime?.aired?.to)}` : ""}`
                    : "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Clock className="text-primary h-4 w-4" />
                  Duration
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.duration || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-foreground flex items-center gap-2 font-semibold">
                  <Leaf className="text-primary h-4 w-4" />
                  Season
                </h4>
                <p className="text-muted-foreground font-medium">
                  {anime?.season
                    ? `${anime?.season?.charAt(0)?.toUpperCase()}${anime?.season?.slice(1)}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
