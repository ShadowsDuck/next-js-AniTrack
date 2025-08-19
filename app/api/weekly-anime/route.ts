import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 25;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("continuing", "true");
    params.append("filter", "tv");

    const apiUrl = `https://api.jikan.moe/v4/seasons/now?${params.toString()}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: AnimeData[]; pagination: Pagination } =
      await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching weekly anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly anime" },
      { status: 500 },
    );
  }
}
