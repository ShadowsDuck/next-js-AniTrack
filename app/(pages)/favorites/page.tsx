import { BackButton } from "@/components/buttons/back-button";
import { Bookmark, BookOpen, Film, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getFavorites } from "@/server/user";
import BrowseButton from "@/components/buttons/browse-button";
import FavoritesSection from "@/components/contents/favorites-details/favorites-section";

export default async function FavoritesPage() {
  const favorites = await getFavorites();

  return (
    <section className="dark bg-background min-h-screen">
      <main className="container mx-auto px-6 py-8">
        <div className="pt-20">
          <BackButton variant="outline" label="Go Back" />
        </div>

        <section className="page-wrapper-layout !pt-10">
          <header className="flex items-center gap-2">
            <Heart size={26} />
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Your Favorites
            </h1>
          </header>
        </section>

        {/* Tabs Section */}
        {favorites.userFavorites.length > 0 ? (
          <Tabs defaultValue="all" className="mt-4 space-y-1">
            <TabsList className="bg-muted/50 grid w-full grid-cols-3 rounded-lg p-1 backdrop-blur-sm">
              <TabsTrigger value="all" className="gap-2">
                <Bookmark size={16} />
                <p>All</p>
                <Badge variant="secondary">
                  {favorites.userFavorites.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="anime" className="gap-2">
                <Film size={16} />
                <p>Anime</p>
                <Badge variant="secondary">
                  {
                    favorites.userFavorites.filter(
                      (anime) => anime.type === "anime",
                    ).length
                  }
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="manga" className="gap-2">
                <BookOpen size={16} />
                <p>Manga</p>
                <Badge variant="secondary">
                  {
                    favorites.userFavorites.filter(
                      (manga) => manga.type === "manga",
                    ).length
                  }
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <FavoritesSection
                favorites={favorites.userFavorites}
                section="all"
              />
            </TabsContent>
            <TabsContent value="anime">
              <FavoritesSection
                favorites={favorites.userFavorites}
                section="anime"
              />
            </TabsContent>
            <TabsContent value="manga">
              <FavoritesSection
                favorites={favorites.userFavorites}
                section="manga"
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="mt-20 flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-lg">
              You haven&apos;t bookmarked any content yet.
            </p>
            <div className="flex items-center gap-4">
              <BrowseButton to="/anime" />
              <BrowseButton to="/manga" />
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
