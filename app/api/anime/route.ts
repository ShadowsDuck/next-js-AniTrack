import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const genres = searchParams.get("genres")?.split(",");
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";
    const order_by = searchParams.get("order_by") || "";
    const sort = searchParams.get("sort") || "desc";
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const start_date = searchParams.get("start_date") || "";
    const end_date = searchParams.get("end_date") || "";

    const params = new URLSearchParams();

    if (q) {
      params.append("q", q);
    }

    if (genres && genres.length > 0) {
      params.append("genres", genres.join(","));
    }

    params.append("type", type);
    params.append("status", status);
    params.append("order_by", order_by);
    params.append("sort", sort);
    params.append("start_date", start_date);
    params.append("end_date", end_date);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const apiUrl = `https://api.jikan.moe/v4/anime?${params.toString()}`;

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
    console.error("Error fetching anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime" },
      { status: 500 },
    );
  }
}
