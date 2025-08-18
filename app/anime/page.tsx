import CardContentLoading from "@/components/loadings/card-content-loading";
import { Suspense } from "react";
import CardContent from "@/components/card-content";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/lib/searchParams";
import Filter from "@/components/filter";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { page, limit, q, genres } = await loadSearchParams(searchParams);
  const uniqueKey = `${q}-${genres.join(",")}-${page}-${limit}`;

  return (
    <div className="page-wrapper-layout">
      <Filter type="anime" />

      {/* key บังคับให้ re-mount component ใหม่เสมอเมื่อฟิลเตอร์เปลี่ยน เพื่อรีเซ็ต state ทั้งหมด */}
      <Suspense
        key={uniqueKey}
        fallback={<CardContentLoading length={limit} />}
      >
        <CardContent
          currentPage={page}
          limit={limit}
          type="anime"
          search={q}
          genres={genres}
        />
      </Suspense>
    </div>
  );
}
