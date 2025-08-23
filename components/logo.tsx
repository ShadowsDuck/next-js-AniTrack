import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="home"
      className="group flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        {/* Animated glow effect */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"></div>

        {/* Logo container */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-white/20 to-white/5 p-1 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
          <Image
            src="/images/AniTrackLogo.png"
            alt="AniTrack logo"
            width={40}
            height={40}
            className="relative z-10 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
          />
        </div>
      </div>

      {/* Brand name */}
      <div className="relative flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">
        <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-pink-300 group-hover:via-purple-300 group-hover:to-cyan-300 lg:text-2xl">
          AniTrack
        </h1>
        <span className="absolute top-full left-0 text-xs font-medium whitespace-nowrap text-slate-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Track Your Anime
        </span>
      </div>

      {/* Decorative elements */}
      <div className="hidden items-center space-x-1 opacity-0 transition-all delay-100 duration-500 group-hover:opacity-100 lg:flex">
        <div className="h-1 w-1 animate-bounce rounded-full bg-pink-400"></div>
        <div className="h-1 w-1 animate-bounce rounded-full bg-purple-400 delay-100"></div>
        <div className="h-1 w-1 animate-bounce rounded-full bg-cyan-400 delay-200"></div>
      </div>
    </Link>
  );
}
