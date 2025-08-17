"use client";

import { useEffect, useState, useTransition } from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

export default function Search() {
  // ใช้ useTransition เพื่อป้องกัน UI ค้าง และแก้ปัญหาข้อมูลไม่อัปเดตในบางครั้ง
  // โดยจะรอให้ข้อมูลใหม่จากเซิร์ฟเวอร์พร้อมก่อน จึงค่อยอัปเดตหน้าจอ
  const [isPending, startTransition] = useTransition();

  const [states, setStates] = useQueryStates(
    {
      q: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false, // ทำให้เกิด server-side navigation
      scroll: false, // ป้องกันหน้าจอเลื่อนขึ้นบน
    },
  );

  const [inputValue, setInputValue] = useState(states.q);

  useEffect(() => {
    setInputValue(states.q);
  }, [states.q]);

  const debouncedUpdate = useDebouncedCallback((value: string) => {
    if (value !== states.q) {
      startTransition(() => {
        setStates({ q: value, page: 1 });
      });
    }
  }, 700);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedUpdate(value);
  };

  return (
    <div className="flex-1 text-[13px] font-normal">
      <label className="text-head mb-2 block text-sm font-semibold">
        Search
      </label>
      <div className="relative">
        <Input
          className="peer h-10 w-full ps-9 pe-2"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={isPending}
        />
        <div className="pointer-events-none absolute inset-y-0 start-1 flex items-center justify-center ps-2 peer-disabled:opacity-50">
          {isPending ? (
            <Loader2 size={14} className="animate-spin text-[#516070]" />
          ) : (
            <SearchIcon size={14} strokeWidth={3} className="text-[#516070]" />
          )}
        </div>
      </div>
    </div>
  );
}
