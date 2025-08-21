interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Images {
  jpg: ImageFormat;
  webp: ImageFormat;
}

interface Title {
  type: string;
  title: string;
}

interface DateProp {
  day: number;
  month: number;
  year: number;
}

interface PublishedProp {
  from: DateProp;
  to: DateProp;
  string: string;
}

interface Published {
  from: string;
  to: string;
  prop: PublishedProp;
}

interface Person {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Broadcast {
  day: "string";
  time: "string";
  timezone: "string";
  string: "string";
}

// Base interface สำหรับข้อมูล common ระหว่าง Anime และ Manga
interface MediaBase {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Person[];
  serializations: Person[];
  genres: Person[];
  explicit_genres: Person[];
  themes: Person[];
  demographics: Person[];
}

declare interface AnimeData extends MediaBase {
  episodes: number;
  aired: Published;
  studios: Person[];
  duration: string;
  season: string;
  broadcast: Broadcast;
}

declare interface MangaData extends MediaBase {
  chapters: number;
  volumes: number;
}

declare interface CharacterData {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

declare interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

type AnimeSeason = "winter" | "spring" | "summer" | "fall";
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
type SectionType = "anime" | "manga" | "character";

declare interface PageCardContentProps {
  search?: string;
  genres?: string[];
  year?: number | null;
  season?: AnimeSeason;
  type?: AnimeType;
  status?: AnimeStatus;
  currentPage: number;
  limit: number;
  cartoonType: SectionType;
}

declare interface FetchAnimeParams {
  search?: string;
  genres?: string[];
  year?: number | null;
  season?: AnimeSeason;
  type?: AnimeType;
  status?: AnimeStatus;
  page: number;
  limit: number;
}
