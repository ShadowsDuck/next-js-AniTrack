import { Skeleton } from "../ui/skeleton";

export default function HomeAnimeLoading({ length = 10 }: { length?: number }) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 space-y-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-sm"
        >
          <div className="card-animate">
            <div className="card-image-wrapper">
              <Skeleton className="card-image rounded-b-none" />
            </div>

            <div className="card-text-layout">
              <h3 className="card-text-name">
                <Skeleton className="h-4 w-full" />
              </h3>
              <div className="card-text-detail h-6.5">
                <Skeleton className="h-4 w-[25%]" />
                <Skeleton className="h-4 w-[25%]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
