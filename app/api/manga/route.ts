import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query: Record<string, string | undefined> = {
      q: searchParams.get("q") || undefined,
      genres: searchParams.get("genres")?.split(",").join(","),
      start_date: searchParams.get("start_date") || undefined,
      end_date: searchParams.get("end_date") || undefined,
      type: searchParams.get("type") || undefined,
      status: searchParams.get("status") || undefined,
      order_by: searchParams.get("order_by") || undefined,
      sort: searchParams.get("sort") || "desc",
      page: searchParams.get("page")
        ? Number(searchParams.get("page")).toString()
        : undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit")).toString()
        : undefined,
    };

    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

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
