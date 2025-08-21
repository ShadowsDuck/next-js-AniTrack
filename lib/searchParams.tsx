import {
  parseAsInteger,
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const cardSearchParams = {
  q: parseAsString.withDefault(""),
  genres: parseAsArrayOf(parseAsString).withDefault([]),
  year: parseAsInteger,
  season: parseAsStringEnum(["winter", "spring", "summer", "fall"]),
  type: parseAsStringEnum([
    "tv",
    "movie",
    "ova",
    "special",
    "ona",
    "music",
    "cm",
    "pv",
    "tv_special",
  ]),
  status: parseAsStringEnum(["airing", "completed", "upcoming"]),
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(24),
};

export const loadSearchParams = createLoader(cardSearchParams);
