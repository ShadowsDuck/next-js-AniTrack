import CardContentLoading from "@/components/loadings/card-content-loading";
import Search from "@/components/search";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function ContentPageLoading() {
  return (
    <div className="page-wrapper-layout">
      <div className="py-12">
        <div className="flex items-center gap-4">
          <Search />
          <Button className="bg-search hover:bg-search mt-7 h-10 w-10 items-center justify-center p-0">
            <SlidersHorizontal
              className="h-5 w-5 text-[#647380]"
              strokeWidth={3}
            />
          </Button>
        </div>
      </div>
      <CardContentLoading length={24} />
    </div>
  );
}
