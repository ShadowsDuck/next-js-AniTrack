"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent" />

      {/* Additional gradient layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 via-transparent" />

      {/* Floating orbs for extra visual interest */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/5 rounded-full blur-3xl animate-pulse-slow" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold opacity-0 animate-fade-slide">
          Discover Your Next{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Anime
          </span>{" "}
          Adventure
        </h1>

        <p
          className="mt-6 text-[17px] text-muted-foreground md:text-lg drop-shadow-sm opacity-0 animate-fade-slide"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          Track, discover, and discuss your favorite anime and manga all in one
          place.
        </p>

        <div
          className="mt-12 flex items-center justify-center gap-4 opacity-0 animate-fade-slide"
          style={{ "--delay": "400ms" } as React.CSSProperties}
        >
          <Button size="lg" className="rounded-xl px-6 text-sm">
            <Link href="#link">
              <span className="text-nowrap">Browse Anime</span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-xl px-6 text-sm"
          >
            <Link href="#link">
              <span className="text-nowrap">Browse Manga</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
