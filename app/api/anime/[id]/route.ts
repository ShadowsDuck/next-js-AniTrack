import { timeout } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const id = (await params).id;

    await timeout(700);
    // Next.js จะ cache fetch request นี้ให้อัตโนมัติ
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
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
    console.error("Error fetching top anime:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime" },
      { status: 500 },
    );
  }
}
