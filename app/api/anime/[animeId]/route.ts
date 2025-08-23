import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { animeId: string } },
) {
  try {
    const { animeId } = params;

    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/full`,
      {
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: AnimeData } = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime" },
      { status: 500 },
    );
  }
}
