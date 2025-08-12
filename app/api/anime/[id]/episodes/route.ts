import { NextRequest, NextResponse } from "next/server";

type PramsProps = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: PramsProps) {
  try {
    const { id } = await params;

    // Next.js จะ cache fetch request นี้ให้อัตโนมัติ
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`, {
      next: {
        revalidate: 900, // cache 15 นาที
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 },
    );
  }
}
