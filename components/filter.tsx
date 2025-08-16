import React from "react";
import Search from "./search";
import MultiSelectUI from "./multi-select-ui";

export default function Filter() {
  return (
    <div className="flex flex-row gap-6 py-12">
      <Search />
      <div className="hidden md:block">
        <MultiSelectUI />
      </div>
    </div>
  );
}
