import { BackButton } from "@/components/buttons/back-button";
import PeopleInfo from "@/components/contents/people-details/people-info";
import NotFoundPage from "@/components/not-found-page";
import { fetchPeopleDetails } from "@/server/cartoon";

export default async function MangaContentPage({
  params,
}: {
  params: Promise<{ peopleId: string }>;
}) {
  const { peopleId } = await params;

  const { peopleDetails }: { peopleDetails: People | null } =
    await fetchPeopleDetails({
      peopleId,
    });

  if (!peopleDetails) {
    return <NotFoundPage />;
  }

  return (
    <div className="dark bg-background min-h-screen">
      <main className="container mx-auto py-8">
        <div className="px-4 pt-20 lg:px-6">
          <BackButton variant="outline" label="Go Back" />
        </div>

        <PeopleInfo people={peopleDetails} />
      </main>
    </div>
  );
}
