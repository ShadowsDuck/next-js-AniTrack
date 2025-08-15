import Search from "@/components/search";
import CardSectionLoading from "@/components/loadings/card-section-loading";
import { Suspense } from "react";
import CardContent from "@/components/card-content";
interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = Number(params.limit) || 24;

  return (
    <div className="page-wrapper-layout">
      <Search />

      <Suspense key={currentPage} fallback={<CardSectionLoading length={24} />}>
        <CardContent currentPage={currentPage} limit={limit} type="character" />
      </Suspense>
    </div>
  );
}
