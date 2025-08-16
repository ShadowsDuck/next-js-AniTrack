import CardSectionLoading from "@/components/loadings/card-section-loading";
import Search from "@/components/search";
import MultiSelectGenres from "../multi-select-genres";

export default function ContentPageLoading() {
  return (
    <div className="page-wrapper-layout">
      <div className="flex flex-row gap-6 py-12">
        <Search />
        <div className="hidden md:block">
          <MultiSelectGenres type="anime" />
        </div>
      </div>
      <CardSectionLoading length={24} />
    </div>
  );
}
