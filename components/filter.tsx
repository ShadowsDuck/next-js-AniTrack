"use client";

import React, { useState, useTransition } from "react";
import Search from "./search";
import MultiSelectGenres from "./filters/multi-select-genres";
import { Button } from "./ui/button";
import { BrushCleaning, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import SelectYear from "./filters/select-year";
import SelectSeason from "./filters/select-season";
import {
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  useQueryStates,
} from "nuqs";
import SelectType from "./filters/select-type";
import SelectStatus from "./filters/select-status";
import SelectRating from "./filters/select-rating";

export default function Filter({ type }: { type: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useQueryStates(
    {
      genres: parseAsArrayOf(parseAsString).withDefault([]),
      year: parseAsString.withDefault(""),
      season: parseAsString.withDefault(""),
      rating: parseAsString.withDefault(""),
      type: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
      scroll: false,
      startTransition, // ส่ง startTransition ให้ nuqs เพื่อให้ UI ไม่ค้าง
    },
  );

  const handleClear = () => {
    setFilters({
      genres: [],
      year: null,
      season: null,
      rating: null,
      type: null,
      status: null,
      page: 1, // รีเซ็ต page
    });
  };

  return (
    <section className="py-12">
      <header className="flex items-center gap-4">
        <Search />
        <Button
          className="bg-search hover:bg-search mt-7 h-10 w-10 items-center justify-center p-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal
            className={cn(
              "h-5 w-5",
              isOpen
                ? "text-accent-foreground duration-500"
                : "text-placeholder duration-500",
            )}
            strokeWidth={3}
          />
        </Button>
      </header>
      {isOpen && (
        <main className="mt-4 flex flex-row gap-4 overflow-x-auto">
          <div>
            <MultiSelectGenres
              type={type}
              value={filters.genres}
              // เมื่อ genres เปลี่ยน ให้รีเซ็ต page เป็น 1 ด้วย
              onValueChange={(newGenres) =>
                setFilters({ genres: newGenres, page: 1 })
              }
              disabled={isPending} // ส่ง isPending เพื่อปิดการใช้งานขณะโหลด
            />
          </div>
          <div>
            <SelectYear
              value={filters.year}
              onValueChange={(newYear) =>
                setFilters({ year: newYear, page: 1 })
              }
              disabled={isPending}
            />
          </div>
          <div>
            <SelectSeason
              value={filters.season}
              onValueChange={(newSeason) => {
                const updates: {
                  season: string | null;
                  page: number;
                  year?: string;
                } = {
                  season: newSeason,
                  page: 1,
                };

                if (newSeason && !filters.year) {
                  updates.year = new Date().getFullYear().toString();
                }

                setFilters(updates);
              }}
              disabled={isPending}
            />
          </div>
          {type === "anime" && (
            <div>
              <SelectRating
                value={filters.rating}
                onValueChange={(newRating) =>
                  setFilters({ rating: newRating, page: 1 })
                }
                disabled={isPending}
              />
            </div>
          )}
          <div>
            <SelectType
              type={type}
              value={filters.type}
              onValueChange={(newType) =>
                setFilters({ type: newType, page: 1 })
              }
              disabled={isPending}
            />
          </div>
          <div>
            <SelectStatus
              type={type}
              value={filters.status}
              onValueChange={(newStatus) =>
                setFilters({ status: newStatus, page: 1 })
              }
              disabled={isPending}
            />
          </div>
          <div className="mt-7">
            <Button
              variant="destructive"
              onClick={handleClear}
              disabled={isPending}
            >
              <BrushCleaning />
              <p className="select-none">Clear Filter</p>
            </Button>
          </div>
        </main>
      )}
    </section>
  );
}
