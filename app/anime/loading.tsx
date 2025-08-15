// app/anime/loading.tsx (ไฟล์ใหม่)

import Search from "@/components/search";
import CardSectionLoading from "@/components/loadings/card-section-loading"; // import Skeleton ของคุณ

export default function Loading() {
  return (
    <div className="page-wrapper-layout">
      <Search />
      <CardSectionLoading length={24} />
    </div>
  );
}
