import { Skeleton } from "../ui/skeleton";

export default function CardSectionLoading() {
  return (
    <div className="card-layout">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card-item !min-h-[320px]">
          {" "}
          {/* Fixed minimum height */}
          <div className="card-animate">
            <div>
              {/* Image skeleton with exact same dimensions as real images */}
              <Skeleton
                className="w-full rounded-lg"
                style={{
                  aspectRatio: "180/265",
                  objectFit: "cover",
                }}
              />

              {/* Text layout skeleton - matching AnimeCard structure exactly */}
              <div className="card-text-layout">
                <Skeleton className="h-4 w-[85%]" /> {/* First line of title */}
                {/* <Skeleton className="mt-1 h-4 w-[65%]" />{" "} */}
                {/* Second line of title */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
