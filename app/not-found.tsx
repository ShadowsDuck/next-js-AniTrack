import LoaderLoading from "@/components/loadings/loader-loading";
import NotFoundPage from "@/components/not-found-page";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<LoaderLoading />}>
      <NotFoundPage />
    </Suspense>
  );
}
