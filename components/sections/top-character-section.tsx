import React, { Suspense } from "react";
import ViewAllButton from "../view-all-button";
import { Users } from "lucide-react";
import CardContentLoading from "../loadings/card-content-loading";
import HomeCardSection from "../home-card-section";

export default function TopCharacterSection() {
  return (
    <section className="card-container my-16">
      <div className="relative overflow-hidden rounded-3xl border border-purple-200/20 bg-gradient-to-bl from-purple-50/5 via-transparent to-purple-100/5 p-8">
        {/* Geometric background patterns */}
        <div className="absolute top-0 left-0 h-28 w-28 -translate-x-12 -translate-y-12 -rotate-12 bg-purple-300/5"></div>
        <div className="absolute right-0 bottom-0 h-36 w-36 translate-x-18 translate-y-18 rotate-45 bg-purple-400/5"></div>

        <header className="relative z-10 mb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-purple-500/70"></div>
                <Users className="h-5 w-5 text-purple-600/80" />
              </div>
              <h2 className="card-text-header text-foreground/85 text-3xl font-bold">
                Top Character of all time
              </h2>
            </div>
            <ViewAllButton to="/character" />
          </div>
        </header>

        <div className="relative z-10">
          <Suspense fallback={<CardContentLoading />}>
            <HomeCardSection type="character" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
