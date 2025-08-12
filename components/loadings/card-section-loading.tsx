import { Skeleton } from "../ui/skeleton";

export default function CardSectionLoading({
  textHeader,
}: {
  textHeader: string;
}) {
  return (
    <>
      <h1 className="card-text-header">{textHeader}</h1>
      <div className="card-layout">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="popup-in relative animate-pulse overflow-hidden rounded-lg"
          >
            <Skeleton className="aspect-180/265 w-full" />
            <div className="mb-[38px] space-y-2 pt-3">
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
