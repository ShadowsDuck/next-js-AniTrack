import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <div className="text-text-2 py-12 text-[13px] font-normal">
      <div className="relative flex-1">
        <Input
          // id={`input-${id}`}
          className="peer h-10 w-full max-w-xs ps-9 pe-2"
          placeholder="Search"
          type="search"
          // value={searchValue}
          // onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-1 flex items-center justify-center ps-2 peer-disabled:opacity-50">
          <SearchIcon size={14} strokeWidth={3} className="text-[#516170]" />
        </div>
      </div>
    </div>
  );
}
