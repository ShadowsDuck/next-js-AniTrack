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
  rating: parseAsStringEnum(["g", "pg", "pg13", "r17", "r", "rx"]),
  type: parseAsString,
  status: parseAsString,
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(24),
};

export const loadSearchParams = createLoader(cardSearchParams);
