import { Skeleton } from "../ui/skeleton";

export default function CardContentLoading({
  length = 6,
}: {
  length?: number;
}) {
  return (
    <div className="card-layout">
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
