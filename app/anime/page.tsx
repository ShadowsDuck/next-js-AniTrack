import Search from "@/components/search";
import CardSectionLoading from "@/components/loadings/card-section-loading";
import { Suspense } from "react";
import CardContent from "@/components/card-content";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const params = await searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 24;

  return (
    <div className="page-wrapper-layout">
      <Search />

      <Suspense fallback={<CardSectionLoading length={24} />}>
        <CardContent currentPage={currentPage} limit={limit} type="anime" />
      </Suspense>
    </div>
  );
}
