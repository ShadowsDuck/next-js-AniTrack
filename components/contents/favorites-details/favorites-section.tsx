import BrowseButton from "@/components/buttons/browse-button";
import { Badge } from "@/components/ui/badge";
import { Favorite } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesSection({
  favorites,
  section,
}: {
  favorites: Favorite[];
  section: "anime" | "manga" | "all";
}) {
  const sectionType =
    section === "anime" || section === "manga" ? section : "all";

  const filteredFavorites =
    sectionType === "all"
      ? favorites
      : favorites.filter((favorite) => favorite.type === sectionType);

  if (sectionType === "anime" && filteredFavorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <p className="text-muted-foreground text-lg">
          You haven&apos;t favorited any anime yet.
        </p>
        <BrowseButton to="/anime" />
      </div>
    );
  }

  if (sectionType === "manga" && filteredFavorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <p className="text-muted-foreground text-lg">
          You haven&apos;t favorited any manga yet.
        </p>
        <BrowseButton to="/manga" />
      </div>
    );
  }

  return (
    <section>
      <main className="container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredFavorites.map((favorite: Favorite) => (
          <div
            key={favorite.id}
            className="cursor-pointer rounded-lg border transition-transform duration-300 hover:scale-[1.02]"
          >
            <Link
              href={
                sectionType === "anime"
                  ? `/anime/${favorite.malId}`
                  : `/manga/${favorite.malId}`
              }
            >
              <figure className="card-image-wrapper relative aspect-[2/3] w-full overflow-hidden rounded-t-lg bg-black">
                {favorite?.image ? (
                  <Image
                    src={favorite?.image}
                    alt={favorite?.title || "Favorite Image"}
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
                {sectionType === "all" && (
                  <div className="absolute inset-0 p-2">
                    <Badge>
                      {favorite.type === "anime" ? "Anime" : "Manga"}
                    </Badge>
                  </div>
                )}
              </figure>
              <div className="p-3">
                <h3 className="line-clamp-2 text-[15px] font-medium">
                  {favorite.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </section>
  );
}
