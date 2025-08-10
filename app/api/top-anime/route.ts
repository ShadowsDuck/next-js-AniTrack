import { NextResponse } from "next/server";

let animeCache: unknown = null;
let lastAnimeFetch = 0;

export async function GET() {
  const now = Date.now();
  const cacheDuration = 15 * 60 * 1000; // 15 นาที

  if (!animeCache || now - lastAnimeFetch > cacheDuration) {
    console.log("Fetching from Jikan API (Anime)...");
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=5");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Jikan API" },
        { status: res.status }
      );
    }

    animeCache = await res.json();
    lastAnimeFetch = now;
  } else {
    console.log("Serving from cache (Anime)...");
  }

  return NextResponse.json(animeCache);
}
