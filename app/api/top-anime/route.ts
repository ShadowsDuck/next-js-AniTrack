import { timeout } from "@/lib/utils";
import { NextResponse } from "next/server";

let animeCache: unknown = null;
let lastAnimeFetch = 0;

export async function GET() {
  await timeout(1000);

  try {
    const now = Date.now();
    const cacheDuration = 15 * 60 * 1000; // 15 นาที

    if (!animeCache || now - lastAnimeFetch > cacheDuration) {
      const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=5");

      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to fetch from Jikan API" },
          { status: res.status },
        );
      }

      animeCache = await res.json();
      lastAnimeFetch = now;
    }

    return NextResponse.json(animeCache);
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch top anime" },
      { status: 500 },
    );
  }
}
