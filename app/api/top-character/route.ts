import { timeout } from "@/lib/utils";
import { NextResponse } from "next/server";

let characterCache: unknown = null;
let lastCharacterFetch = 0;

export async function GET() {
  await timeout(1000);

  try {
    const now = Date.now();
    const cacheDuration = 15 * 60 * 1000; // 15 นาที

    if (!characterCache || now - lastCharacterFetch > cacheDuration) {
      const res = await fetch(
        "https://api.jikan.moe/v4/top/characters?limit=5",
      );

      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to fetch from Jikan API" },
          { status: res.status },
        );
      }

      characterCache = await res.json();
      lastCharacterFetch = now;
    }

    return NextResponse.json(characterCache);
  } catch (error) {
    console.error("Error fetching top character:", error);
    return NextResponse.json(
      { error: "Failed to fetch top character" },
      { status: 500 },
    );
  }
}
