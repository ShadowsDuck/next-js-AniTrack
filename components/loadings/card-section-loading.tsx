import { Skeleton } from "../ui/skeleton";

export default function CardSectionLoading({
  textHeader,
}: {
  textHeader: string;
}) {
  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="popup-in relative animate-pulse overflow-hidden rounded-lg border"
          >
            <Skeleton className="aspect-[5/8] w-full" />
            <div className="mb-[38px] space-y-2 px-3 pt-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/6" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
