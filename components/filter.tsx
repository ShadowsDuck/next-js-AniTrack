"use client";

import React, { useRef, useState } from "react";
import Search from "./search";
import MultiSelectGenres from "./multi-select-genres";
import { Button } from "./ui/button";
import { BrushCleaning, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiSelectRef } from "./ui/multi-select";

export default function Filter({ type }: { type: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const multiSelectRef = useRef<MultiSelectRef>(null);

  const handleClear = () => {
    multiSelectRef.current?.clear();
  };

  return (
    <div className="py-12">
      <div className="flex items-center gap-4">
        <Search />
        <Button
          className="bg-search hover:bg-search mt-7 h-10 w-10 items-center justify-center p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal
            className={cn(
              "h-5 w-5",
              isOpen
                ? "text-[#6bc0f6] duration-500"
                : "text-[#647380] duration-500",
            )}
            strokeWidth={3}
          />
        </Button>
      </div>
      {isOpen && (
        <div className="mt-4 flex flex-row gap-4 overflow-x-auto">
          <div>
            <MultiSelectGenres type={type} clearFilter={multiSelectRef} />
          </div>
          <div>
            <MultiSelectGenres type={type} clearFilter={multiSelectRef} />
          </div>
          <div>
            <MultiSelectGenres type={type} clearFilter={multiSelectRef} />
          </div>
          <div>
            <MultiSelectGenres type={type} clearFilter={multiSelectRef} />
          </div>
          <div className="mt-7.5">
            <Button variant="destructive" onClick={handleClear}>
              <BrushCleaning />
              <p>Clear Filter</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
