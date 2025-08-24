import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { mangaId: string } },
) {
  try {
    const { mangaId } = params;

    const response = await fetch(
      `https://api.jikan.moe/v4/manga/${mangaId}/full`,
      {
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: MangaData } = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching manga:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga" },
      { status: 500 },
    );
  }
}
