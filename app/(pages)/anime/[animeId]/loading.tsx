import { LoaderOne } from "@/components/ui/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="page-wrapper-layout mx-auto flex min-h-100 justify-center !pt-32">
      <LoaderOne />
    </div>
  );
}
