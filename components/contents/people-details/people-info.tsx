import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimeRelationSection from "./anime-relation-section";
import MangaRelationSection from "./manga-relation-section";
import VoiceRelationSection from "./voice-relation-section";
import { parseAbout } from "@/lib/parse-character-about";
import { Cake } from "lucide-react";
import { formatDate } from "@/lib/format-date";

export default async function PeopleInfo({ people }: { people: People }) {
  const { details, description } = parseAbout(people?.about);

  return (
    <section className="page-wrapper-layout !pt-10">
      <main className="container grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Poster Section (ส่วนนี้เหมือนเดิม) */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 flex flex-col items-center">
            <figure className="card-image-wrapper aspect-[2/3] w-full overflow-hidden rounded-lg bg-black">
              {people?.images ? (
                <Image
                  src={people?.images?.jpg.image_url}
                  alt={people?.name || "people Image"}
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
            <div className="mt-6 w-full max-w-sm rounded-lg border p-6 max-lg:max-w-full lg:max-w-none">
              {/* เปลี่ยนเป็นใช้ details object ที่เราสร้าง */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Details</h2>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Full Name
                    </h4>
                    <p className="mt-1 text-base font-medium">
                      {people?.family_name + people?.given_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Birthday
                    </h4>
                    <h5 className="mt-1 flex items-center gap-1.5 text-base font-medium">
                      <Cake size={15} />
                      <p className="mt-0.5">
                        {formatDate(people?.birthday) || "N/A"}
                      </p>
                    </h5>
                  </div>
                  <div>
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Favorites
                    </h4>
                    <p className="mt-1 text-base font-medium">
                      {people?.favorites?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Section */}
        <article className="space-y-6 lg:col-span-8 xl:col-span-9">
          <header className="space-y-4">
            <hgroup>
              <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-xl leading-tight font-bold text-transparent sm:text-2xl lg:text-3xl">
                {people?.name || "N/A"}
              </h1>
            </hgroup>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">About</h2>
              <div className="mb-8 space-y-2">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-muted-foreground text-base font-medium">
                      {key}: {value}
                    </h4>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
                {description || "No description available."}
              </p>
            </div>
          </header>

          {/* Tabs Section */}
          <Tabs defaultValue="voice" className="space-y-4">
            <TabsList className="bg-muted/50 grid w-full grid-cols-3 rounded-lg p-1 backdrop-blur-sm">
              <TabsTrigger value="voice">Voice Actors</TabsTrigger>
              <TabsTrigger value="anime">Anime Staff</TabsTrigger>
              <TabsTrigger value="manga">Manga</TabsTrigger>
            </TabsList>
            <TabsContent value="voice">
              <VoiceRelationSection people={people} />
            </TabsContent>
            <TabsContent value="anime">
              <AnimeRelationSection people={people} />
            </TabsContent>
            <TabsContent value="manga">
              <MangaRelationSection people={people} />
            </TabsContent>
          </Tabs>
        </article>
      </main>
    </section>
  );
}
