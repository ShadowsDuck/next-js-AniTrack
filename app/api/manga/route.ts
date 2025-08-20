import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const genres = searchParams.get("genres")?.split(",");
    const type = searchParams.get("type") || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;

    const params = new URLSearchParams();

    if (q) {
      params.append("q", q);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    params.append("type", type);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("order_by", "score");
    params.append("sort", "desc");

    const apiUrl = `https://api.jikan.moe/v4/manga?${params.toString()}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Jikan API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const result: { data: MangaData[]; pagination: Pagination } =
      await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching manga:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga" },
      { status: 500 },
    );
  }
}
