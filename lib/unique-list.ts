import { useMemo } from "react";

export function useUniqueList<T extends { mal_id?: number }>(list?: T[]): T[] {
  return useMemo(() => {
    if (!list || !Array.isArray(list)) return [];

    const map = new Map<number, T>();
    list.forEach((item) => {
      if (item?.mal_id !== undefined) {
        map.set(item.mal_id, item);
      }
    });
    return Array.from(map.values());
  }, [list]);
}
