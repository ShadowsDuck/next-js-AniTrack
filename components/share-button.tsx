"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // สมมติว่าจะคัดลอก URL ปัจจุบัน
      const url = window.location.href;

      await navigator.clipboard.writeText(url);
      setCopied(true);

      // reset state ผ่านไป 2 วิ
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="hover:bg-muted/50 col-span-2 flex-1 border-2 transition-all duration-300 sm:flex-initial"
      onClick={handleCopy}
    >
      <Share2 className="mr-2 h-5 w-5" />
      {copied ? "Copied!" : "Share"}
    </Button>
  );
}
