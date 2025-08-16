import CardSectionLoading from "@/components/loadings/card-section-loading";
import MultiSelectUI from "@/components/multi-select-ui";
import Search from "@/components/search";

export default function ContentPageLoading() {
  return (
    <div className="page-wrapper-layout">
      <div className="flex flex-row gap-6 py-12">
        <Search />
        <div className="hidden md:block">
          <MultiSelectUI />
        </div>
      </div>
      <CardSectionLoading length={24} />
    </div>
  );
}
