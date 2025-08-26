import { BookOpen } from "lucide-react";
import React, { Suspense } from "react";
import ViewAllButton from "../buttons/view-all-button";
import HomeCardSection from "../home-card-section";
import CardContentLoading from "../loadings/card-content-loading";

export default function TopMangaSection() {
  return (
    <section className="card-container my-16">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/20 bg-gradient-to-br from-emerald-50/5 via-transparent to-emerald-100/5 p-8">
        {/* Geometric background patterns */}
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rotate-45 bg-emerald-300/5"></div>
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-8 translate-y-8 rotate-12 bg-emerald-400/5"></div>

        <header className="relative z-10 mb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-emerald-500/70"></div>
                <BookOpen className="h-5 w-5 text-emerald-600/80" />
              </div>
              <h2 className="card-text-header text-foreground/85 text-3xl font-bold">
                Top Manga of all time
              </h2>
            </div>
            <ViewAllButton to="/manga" />
          </div>
        </header>

        <div className="relative z-10">
          <Suspense fallback={<CardContentLoading />}>
            <HomeCardSection type="manga" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
