import CardContentLoading from "@/components/loadings/card-content-loading";
import { Suspense } from "react";
import PageCardContent from "@/components/page-card-content";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/lib/searchParams";
import Filter from "@/components/filter";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { q, genres, year, season, rating, type, status, page, limit } =
    await loadSearchParams(searchParams);
  const uniqueKey = `${q}-${genres.join(",")}-${page}-${limit}`;

  return (
    <div className="page-wrapper-layout">
      <Filter type="anime" />

      {/* key บังคับให้ re-mount component ใหม่เสมอเมื่อฟิลเตอร์เปลี่ยน เพื่อรีเซ็ต state ทั้งหมด */}
      <Suspense
        key={uniqueKey}
        fallback={<CardContentLoading length={limit} />}
      >
        <PageCardContent
          search={q}
          genres={genres}
          year={year}
          season={season ?? undefined} // ถ้า season ไม่มีการเลือกให้ season แปลง null เป็น undefined
          rating={rating ?? undefined}
          type={(type as AnimeType) ?? undefined}
          status={(status as AnimeStatus) ?? undefined}
          page={page}
          limit={limit}
          cartoonType="anime"
        />
      </Suspense>
    </div>
  );
}
