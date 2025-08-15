import Search from "@/components/search";
import CardSectionLoading from "@/components/loadings/card-section-loading";
import { Suspense } from "react";
import CardContent from "@/components/card-content";

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 24;

  return (
    <div className="page-wrapper-layout">
      <Search />

      <Suspense key={currentPage} fallback={<CardSectionLoading length={24} />}>
        <CardContent currentPage={currentPage} limit={limit} type="anime" />
      </Suspense>
    </div>
  );
}
