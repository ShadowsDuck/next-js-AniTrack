"use client";

import { MultiSelect } from "../ui/multi-select";
import { animeGenres, mangaGenres } from "@/lib";
import { useDebouncedCallback } from "use-debounce";

interface MultiSelectGenresProps {
  type?: string;
  value: string[]; // รับค่า genres ปัจจุบันจาก parent
  onValueChange: (values: string[]) => void; // ฟังก์ชันสำหรับแจ้ง parent เมื่อค่าเปลี่ยน
  disabled?: boolean; // รับสถานะ disabled จาก parent
}

export default function MultiSelectGenres({
  type,
  value,
  onValueChange,
  disabled,
}: MultiSelectGenresProps) {
  const optionGenres = type === "anime" ? animeGenres : mangaGenres;

  // 3. คง useDebouncedCallback ไว้ แต่เปลี่ยนให้เรียก onValueChange แทน setStates
  const debouncedUpdate = useDebouncedCallback((newValues: string[]) => {
    // ตรวจสอบว่าค่าเปลี่ยนจริง ๆ ค่อยยิง onValueChange เพื่อประสิทธิภาพ
    if (newValues.join(",") !== value.join(",")) {
      onValueChange(newValues);
    }
  }, 500);

  const handleChange = (newValues: string[]) => {
    debouncedUpdate(newValues);
  };

  return (
    <div>
      <label className="text-head mb-2 block text-sm font-semibold">
        Genres
      </label>
      <div className="space-y-2">
        <MultiSelect
          options={optionGenres}
          value={value}
          onValueChange={handleChange}
          disabled={disabled}
          searchable={false}
          minWidth="270px"
          maxWidth="270px"
          placeholder="Any"
          maxCount={1}
          className="hover:bg-search bg-search border-none select-none"
          variant="custom"
        />
      </div>
    </div>
  );
}
