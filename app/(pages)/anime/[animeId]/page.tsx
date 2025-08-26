import { BackButton } from "@/components/buttons/back-button";
import AnimeInfo from "@/components/contents/anime-details/anime-info";
import CharactersSection from "@/components/contents/anime-details/characters-section";
import EpisodesSection from "@/components/contents/anime-details/episodes-section";
import NewsSection from "@/components/contents/anime-details/news-section";
import RelatedSection from "@/components/contents/anime-details/related-section";
import WhereToWatch from "@/components/contents/anime-details/where-to-watch";
import NotFoundPage from "@/components/not-found-page";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { fetchAnimeDetails } from "@/server/cartoon";
import { TabsList } from "@radix-ui/react-tabs";

export default async function AnimeContentPage({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = await params;

  const { animeDetails }: { animeDetails: AnimeData | null } =
    await fetchAnimeDetails({
      animeId,
    });

  if (!animeDetails) {
    return <NotFoundPage />;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto py-8">
        <div className="px-4 pt-20 lg:px-6">
          <BackButton variant="outline" label="Go Back" />
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <AnimeInfo anime={animeDetails} />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-search/80 grid w-full grid-cols-4 rounded-lg p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <NewsSection animeId={animeId} />
              </div>
              <div>
                <WhereToWatch anime={animeDetails} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="episodes">
            <EpisodesSection animeId={animeId} />
          </TabsContent>

          <TabsContent value="characters">
            <CharactersSection animeId={animeId} />
          </TabsContent>

          <TabsContent value="related">
            <RelatedSection anime={animeDetails} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
