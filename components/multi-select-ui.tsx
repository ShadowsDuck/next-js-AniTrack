"use client";

import { useState } from "react";
import { MultiSelect } from "./ui/multi-select";
import { animeGenres } from "@/lib";

export default function MultiSelectUI() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  console.log(selectedValues);

  return (
    <div>
      <label className="text-text-2 mb-2 block text-sm font-semibold">
        Genres
      </label>
      <div className="space-y-2">
        <MultiSelect
          options={animeGenres}
          value={selectedValues}
          onValueChange={setSelectedValues}
          searchable={false}
          maxCount={1}
          minWidth="330px"
          maxWidth="330px"
          placeholder="Any"
          className="hover:bg-search bg-search border-none"
        />
      </div>
    </div>
  );
}
