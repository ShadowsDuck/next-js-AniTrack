import { NextResponse } from "next/server";

let mangaCache: unknown = null;
let lastMangaFetch = 0;

export async function GET() {
  const now = Date.now();
  const cacheDuration = 15 * 60 * 1000; // 15 นาที

  if (!mangaCache || now - lastMangaFetch > cacheDuration) {
    console.log("Fetching from Jikan API (Manga)...");
    const res = await fetch("https://api.jikan.moe/v4/top/manga?limit=5");

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Jikan API" },
        { status: res.status }
      );
    }

    mangaCache = await res.json();
    lastMangaFetch = now;
  } else {
    console.log("Serving from cache (Manga)...");
  }

  return NextResponse.json(mangaCache);
}
