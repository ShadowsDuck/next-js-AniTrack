"use client";

import * as React from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 border-1 border-[#e4e4e4] bg-[#fcfcfc] px-0 shadow-xs dark:border-[#323232] dark:bg-[#0b1622]"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.light_&]:block" />
      <MoonIcon className="hidden [html.dark_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
