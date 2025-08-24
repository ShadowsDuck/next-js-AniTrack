import BackgroundSection from "@/components/contents/manga-details/background-section";
import ExternalSection from "@/components/contents/manga-details/external-section";
import MangaInfo from "@/components/contents/manga-details/manga-info";
import RelatedSection from "@/components/contents/manga-details/related-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchMangaDetails } from "@/server/cartoon";

export default async function MangaContentPage({
  params,
}: {
  params: Promise<{ mangaId: string }>;
}) {
  const { mangaId } = await params;

  const { mangaDetails }: { mangaDetails: MangaData | null } =
    await fetchMangaDetails({
      mangaId,
    });

  if (!mangaDetails) {
    return <div>Error</div>;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <MangaInfo manga={mangaDetails} />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-card/80 grid w-full grid-cols-2 rounded-lg p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <BackgroundSection manga={mangaDetails} />
              </div>
              <div>
                <ExternalSection manga={mangaDetails} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="space-y-8">
            <RelatedSection manga={mangaDetails} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
