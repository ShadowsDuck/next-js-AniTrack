import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { characterId: string } },
) {
  try {
    const { characterId } = params;

    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${characterId}/full`,
      {
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: CharacterData } = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching character:", error);
    return NextResponse.json(
      { error: "Failed to fetch character" },
      { status: 500 },
    );
  }
}
