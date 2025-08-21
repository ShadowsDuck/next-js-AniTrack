"use client";

import { useTransition } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { CustomSelect } from "@/components/ui/custom-select";
import { yearOptions } from "@/lib";

export default function YearSelect() {
  const [isPending, startTransition] = useTransition();

  const [year, setYear] = useQueryState(
    "year",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      scroll: false,
    }),
  );

  const handleValueChange = (newYear: string) => {
    startTransition(() => {
      setYear(newYear);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      setYear("");
    });
  };

  return (
    <div className="w-[180px]">
      <label className="text-head mb-2 block text-sm font-semibold">Year</label>
      <div className="space-y-2">
        <CustomSelect
          options={yearOptions}
          value={year}
          placeholder="Any"
          onValueChange={handleValueChange}
          onReset={handleReset}
          className="w-full select-none"
          disabled={isPending}
        />
      </div>
    </div>
  );
}
