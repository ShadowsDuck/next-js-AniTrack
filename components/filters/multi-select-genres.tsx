"use client";

import { useTransition } from "react";
import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
} from "nuqs";
import { MultiSelect, MultiSelectRef } from "../ui/multi-select";
import { animeGenres, mangaGenres } from "@/lib";
import { useDebouncedCallback } from "use-debounce";

export default function MultiSelectGenres({
  type,
  clearFilter,
}: {
  type?: string;
  clearFilter?: React.RefObject<MultiSelectRef | null>;
}) {
  // ใช้ useTransition เพื่อป้องกัน UI ค้าง และแก้ปัญหาข้อมูลไม่อัปเดตในบางครั้ง
  // โดยจะรอให้ข้อมูลใหม่จากเซิร์ฟเวอร์พร้อมก่อน จึงค่อยอัปเดตหน้าจอ
  const [isPending, startTransition] = useTransition();
  const optionGenres = type === "anime" ? animeGenres : mangaGenres;

  const [states, setStates] = useQueryStates(
    {
      genres: parseAsArrayOf(parseAsString).withDefault([]),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false, // ทำให้เกิด server-side navigation
      scroll: false, // ป้องกันหน้าจอเลื่อนขึ้นบน
    },
  );

  const debouncedUpdate = useDebouncedCallback((values: string[]) => {
    // ตรวจสอบว่าค่ามีการเปลี่ยนแปลงจริงหรือไม่ก่อนที่จะอัปเดต
    // (ป้องกันการยิง request ซ้ำซ้อนถ้าผู้ใช้แค่เปิด-ปิด dropdown)
    if (values.join(",") !== states.genres.join(",")) {
      startTransition(() => {
        setStates({ genres: values, page: 1 });
      });
    }
  }, 500);

  const handleChange = (values: string[]) => {
    debouncedUpdate(values);
  };

  return (
    <div>
      <label className="text-head mb-2 block text-sm font-semibold">
        Genres
      </label>
      <div className="space-y-2">
        <MultiSelect
          ref={clearFilter}
          options={optionGenres}
          defaultValue={states.genres}
          onValueChange={handleChange}
          searchable={false}
          minWidth="270px"
          maxWidth="270px"
          placeholder="Any"
          maxCount={1}
          className="hover:bg-search bg-search border-none select-none"
          disabled={isPending}
          variant="custom"
        />
      </div>
    </div>
  );
}
