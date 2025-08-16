import {
  parseAsInteger,
  createLoader,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

export const cardSearchParams = {
  q: parseAsString.withDefault(""),
  genres: parseAsArrayOf(parseAsString).withDefault([]),
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(24),
};

export const loadSearchParams = createLoader(cardSearchParams);
