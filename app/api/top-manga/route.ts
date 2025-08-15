import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;

    const response = await fetch(
      `https://api.jikan.moe/v4/top/manga?page=${page}&limit=${limit}`,
      {
        next: {
          revalidate: 900, // cache 15 นาที
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result: { data: MangaData[]; pagination: Pagination } =
      await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching top manga:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga" },
      { status: 500 },
    );
  }
}
