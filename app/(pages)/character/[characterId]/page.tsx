import { BackButton } from "@/components/buttons/back-button";
import CharacterInfo from "@/components/contents/character-details/character-info";
import NotFoundPage from "@/components/not-found-page";
import { fetchCharacterDetails } from "@/server/cartoon";

export default async function MangaContentPage({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  const { characterId } = await params;

  const { characterDetails }: { characterDetails: CharacterData | null } =
    await fetchCharacterDetails({
      characterId,
    });

  if (!characterDetails) {
    return <NotFoundPage />;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto py-8">
        <div className="px-4 pt-20 lg:px-6">
          <BackButton variant="outline" label="Go Back" />
        </div>

        <CharacterInfo character={characterDetails} />
      </main>
    </div>
  );
}
