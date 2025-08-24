import CharacterInfo from "@/components/contents/character-details/character-info";
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
    return <div>Error</div>;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto py-8">
        <CharacterInfo character={characterDetails} />
      </main>
    </div>
  );
}
