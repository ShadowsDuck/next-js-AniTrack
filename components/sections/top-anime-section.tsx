import React, { Suspense } from "react";
import ViewAllButton from "../view-all-button";
import HomeAnimeLoading from "../loadings/home-anime-loading";
import CardSection from "../card-section";
import { Flame } from "lucide-react";

export default function TopAnimeSection() {
  return (
    <div className="container mx-auto max-w-[40rem] px-4 md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] 2xl:max-w-[95rem]">
      {/* Anime Section */}
      <section className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Main Content */}
        <main className="relative">
          {/* Background decoration using theme colors */}
          <div className="bg-primary/20 absolute -top-4 -left-4 h-24 w-24 rounded-full opacity-40 shadow-[0_0_50px_rgba(99,102,241,0.3)] blur-xl"></div>

          <header className="relative z-10 mb-8 flex items-center justify-between">
            <div className="relative">
              <h1 className="card-text-header text-primary text-4xl font-bold drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                Top Anime of all time
              </h1>
              <div className="bg-primary absolute -bottom-2 left-0 h-1 w-20 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
            </div>
            <span className="mb-2 transform transition-all duration-300 hover:scale-105">
              <ViewAllButton to="/anime" />
            </span>
          </header>

          <div className="relative">
            <div className="bg-primary/10 absolute inset-0 rounded-2xl opacity-50 shadow-[0_0_60px_rgba(99,102,241,0.3)] blur-xl"></div>
            <div className="bg-card/80 border-border shadow-primary/20 relative z-10 rounded-2xl border p-6 shadow-xl backdrop-blur-sm">
              <Suspense fallback={<HomeAnimeLoading />}>
                <CardSection type="anime" path="home" />
              </Suspense>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="border-sidebar-border bg-sidebar shadow-primary/10 relative hidden h-[786px] overflow-hidden rounded-2xl border p-8 shadow-xl xl:block 2xl:h-[932px]">
          {/* Background decorations using theme colors */}
          <div className="bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-full shadow-[0_0_80px_rgba(99,102,241,0.2)] blur-2xl"></div>
          <div className="bg-accent/20 absolute bottom-0 left-0 h-24 w-24 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.15)] blur-xl"></div>

          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                  <Flame fill="#fff" width={20} height={20} />
                </div>
                <h2 className="text-sidebar-foreground text-xl font-bold tracking-wider uppercase">
                  Trending Now
                </h2>
              </div>
            </div>

            <div className="via-border mb-6 h-px bg-gradient-to-r from-transparent to-transparent"></div>

            <section>
              <CardSection type="animeSidebar" path="home" />
            </section>
          </div>

          {/* Bottom gradient border */}
          <div className="via-border absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"></div>
        </aside>
      </section>
    </div>
  );
}
