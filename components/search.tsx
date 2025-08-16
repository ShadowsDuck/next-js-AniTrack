"use client";
import { useEffect, useState } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

export default function Search() {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [inputValue, setInputValue] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (page == null) {
      setPage(1);
    }
  }, [page, setPage]);

  // Sync inputValue กับ query เมื่อ query เปลี่ยนจากภายนอก
  useEffect(() => {
    setInputValue(query);
    setIsSearching(false);
  }, [query]);

  // Debounced callback สำหรับอัปเดต query
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    if (value !== query) {
      setQuery(value);
      setPage(1);
    }
    setIsSearching(false);
  }, 700);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // เริ่ม loading เฉพาะเมื่อ value ต่างจาก query ปัจจุบัน
    if (value !== query) {
      setIsSearching(true);
      debouncedSetQuery(value);
    }
  };

  return (
    <div className="text-text-1 text-[13px] font-normal">
      <label className="text-text-2 mb-2 block text-sm font-semibold">
        Search
      </label>
      <div className="relative flex-1">
        <Input
          className="peer h-10 w-full max-w-xs ps-9 pe-2"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-1 flex items-center justify-center ps-2 peer-disabled:opacity-50">
          {isSearching ? (
            <Loader2 size={14} className="animate-spin text-[#516070]" />
          ) : (
            <SearchIcon size={14} strokeWidth={3} className="text-[#516070]" />
          )}
        </div>
      </div>
    </div>
  );
}
