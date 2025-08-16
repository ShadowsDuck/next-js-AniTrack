import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;

    const apiUrl = q
      ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`
      : `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`;

    const response = await fetch(apiUrl, {
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result: { data: AnimeData[]; pagination: Pagination } =
      await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime" },
      { status: 500 },
    );
  }
}
