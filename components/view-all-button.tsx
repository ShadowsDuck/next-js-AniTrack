import React from "react";
import Link from "next/link";

export default function ViewAllButton({ to }: { to: string }) {
  return (
    <Link href={to}>
      <p className="text-text-1 hover:text-text-3 mt-1 text-[12px] font-semibold tracking-wider duration-200">
        View All
      </p>
    </Link>
  );
}
