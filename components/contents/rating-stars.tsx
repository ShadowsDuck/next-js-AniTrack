import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({
  rating,
  maxRating = 10,
  size = "md",
}: RatingStarsProps) {
  const normalizedRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : index === fullStars && hasHalfStar
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-muted-foreground fill-transparent"
          }`}
        />
      ))}
      <span className="text-muted-foreground ml-1 text-sm">
        {rating}/{maxRating}
      </span>
    </div>
  );
}
