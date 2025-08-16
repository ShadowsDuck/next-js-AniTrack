import React from "react";
import Search from "./search";
import MultiSelectGenres from "./multi-select-genres";

export default function Filter({ type }: { type: string }) {
  return (
    <div className="flex flex-row gap-6 py-12">
      <Search />
      <div className="hidden md:block">
        <MultiSelectGenres type={type} />
      </div>
    </div>
  );
}
