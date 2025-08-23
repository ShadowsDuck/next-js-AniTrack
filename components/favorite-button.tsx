"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export default function FavoriteButton() {
  const [states, setStates] = useState({
    heart: false,
  });

  const toggleState = (key: keyof typeof states) => {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="hover:bg-muted/50 w-full flex-1 border-2 transition-all duration-300 hover:text-red-500 sm:flex-initial"
      onClick={() => toggleState("heart")}
      asChild
    >
      <IconButton
        icon={Heart}
        active={states.heart}
        color={[239, 68, 68]}
        size="md"
      />
    </Button>
  );
}
