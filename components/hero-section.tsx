"use client";

import React from "react";
import BrowseButton from "./buttons/browse-button";

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden px-6 py-32">
      {/* Animated Gradient Background */}
      <div className="from-primary/20 absolute inset-0 bg-gradient-to-br via-transparent" />

      {/* Additional gradient layers for depth */}
      <div className="from-primary/20 absolute inset-0 bg-gradient-to-bl via-transparent" />

      {/* Floating orbs for extra visual interest */}
      <div className="bg-primary/10 animate-float absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-accent/10 animate-float-delayed absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-chart-2/5 animate-pulse-slow absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center">
        <h1 className="animate-fade-slide mt-6 text-4xl font-bold opacity-0 sm:text-5xl md:text-6xl md:leading-[1.2]">
          Discover Your Next{" "}
          <span className="from-primary to-chart-2 bg-gradient-to-r bg-clip-text text-transparent">
            Anime
          </span>{" "}
          Adventure
        </h1>

        <p
          className="text-muted-foreground animate-fade-slide mt-6 text-[17px] opacity-0 drop-shadow-sm md:text-lg"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          Track, discover, and discuss your favorite anime and manga all in one
          place.
        </p>

        <div
          className="animate-fade-slide mt-12 flex items-center justify-center gap-4 opacity-0"
          style={{ "--delay": "400ms" } as React.CSSProperties}
        >
          <BrowseButton to={"/anime"} size="lg" />
          <BrowseButton to={"/manga"} size="lg" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
