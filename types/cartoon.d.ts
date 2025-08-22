type Season = "winter" | "spring" | "summer" | "fall";
type AnimeRating = "g" | "pg" | "pg13" | "r17" | "r" | "rx";
type AnimeType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";
type AnimeStatus = "airing" | "completed" | "upcoming";

type MangaType =
  | "manga"
  | "novel"
  | "lightnovel"
  | "oneshot"
  | "doujin"
  | "manhwa"
  | "manhua";
type MangaStatus =
  | "publishing"
  | "completed"
  | "hiatus"
  | "discontinued"
  | "upcoming";

type SectionType = "anime" | "manga" | "character";

interface BaseCardProps {
  search?: string;
  genres?: string[];
  year?: number | null;
  season?: Season;
  type?: AnimeType | MangaType;
  status?: AnimeStatus | MangaStatus;
  page: number;
  limit: number;
}

declare interface PageCardContentProps extends BaseCardProps {
  rating?: AnimeRating;
  cartoonType: SectionType;
}

// Omit<CardProps, "type" | "status"> คือการสร้าง type ใหม่จาก `CardProps` โดยตัด property "type" และ "status" ออก เหลือ property อื่น ๆ ใช้ต่อได้
declare interface FetchAnimeParams
  extends Omit<BaseCardProps, "type" | "status"> {
  rating?: AnimeRating;
  type?: AnimeType;
  status?: AnimeStatus;
}

interface FetchMangaParams extends Omit<BaseCardProps, "type" | "status"> {
  type?: MangaType;
  status?: MangaStatus;
}
