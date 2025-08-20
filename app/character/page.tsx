import CardContentLoading from "@/components/loadings/card-content-loading";
import { Suspense } from "react";
import PageCardContent from "@/components/page-card-content";
import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/lib/searchParams";
import Search from "@/components/search";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const { page, limit, q } = await loadSearchParams(searchParams);

  return (
    <div className="page-wrapper-layout">
      <div className="py-12">
        <Search />
      </div>

      <Suspense fallback={<CardContentLoading length={limit} />}>
        <PageCardContent
          currentPage={page}
          limit={limit}
          type="character"
          search={q}
        />
      </Suspense>
    </div>
  );
}
