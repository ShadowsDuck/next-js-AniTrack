import AnimeInfo from "@/components/contents/anime-info";
import CharactersSection from "@/components/contents/characters-section";
import EpisodesSection from "@/components/contents/episodes-section";
import NewsSection from "@/components/contents/news-section";
import RelatedSection from "@/components/contents/related-section";
import WhereToWatch from "@/components/contents/where-to-watch";
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
    return <div>Error</div>;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <AnimeInfo anime={animeDetails} />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-card/80 grid w-full grid-cols-4 rounded-lg p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <NewsSection animeId={animeId} />
              </div>
              <div>
                <WhereToWatch anime={animeDetails} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="episodes" className="space-y-8">
            <EpisodesSection animeId={animeId} />
          </TabsContent>

          <TabsContent value="characters" className="space-y-8">
            <CharactersSection animeId={animeId} />
          </TabsContent>

          <TabsContent value="related" className="space-y-8">
            <RelatedSection anime={animeDetails} />
          </TabsContent>
        </Tabs>

        {/* Side Content */}
      </main>
    </div>
  );
}
