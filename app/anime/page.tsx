import CardSectionLoading from "@/components/loadings/card-section-loading";
import { Suspense } from "react";
import CardContent from "@/components/card-content";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/lib/searchParams";
import Filter from "@/components/filter";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { page, limit, q } = await loadSearchParams(searchParams);

  return (
    <div className="page-wrapper-layout">
      <Filter />

      <Suspense fallback={<CardSectionLoading length={limit} />}>
        <CardContent currentPage={page} limit={limit} type="anime" search={q} />
      </Suspense>
    </div>
  );
}
