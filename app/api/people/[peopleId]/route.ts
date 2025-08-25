import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { peopleId: string } },
) {
  try {
    const { peopleId } = params;

    const response = await fetch(
      `https://api.jikan.moe/v4/people/${peopleId}/full`,
      {
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: People } = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching people:", error);
    return NextResponse.json(
      { error: "Failed to fetch people" },
      { status: 500 },
    );
  }
}
