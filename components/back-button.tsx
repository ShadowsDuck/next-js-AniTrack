"use client";

import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  variant?: "default" | "ghost" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  label?: string;
  href?: string;
  className?: string;
  showLabel?: boolean;
}

export function BackButton({
  variant = "ghost",
  size = "md",
  label = "Back",
  href,
  className,
  showLabel = true,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  const sizeClasses = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={handleBack}
        className={cn(
          "group hover:bg-muted/80 focus:ring-ring inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none",
          className,
        )}
      >
        <ChevronLeft
          className={cn(
            iconSizes[size],
            "transition-transform duration-300 group-hover:-translate-x-1",
          )}
        />
        {showLabel && (
          <span className="group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        )}
      </button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md",
        sizeClasses[size],
        className,
      )}
    >
      {/* Background animation */}
      <div className="from-primary/20 to-primary/10 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 group-hover:translate-x-0" />

      <div className="relative flex items-center gap-2">
        <ArrowLeft
          className={cn(
            iconSizes[size],
            "transition-transform duration-300 group-hover:-translate-x-1",
          )}
        />
        {showLabel && (
          <span className="transition-opacity duration-300 group-hover:opacity-90">
            {label}
          </span>
        )}
      </div>
    </Button>
  );
}

// Floating Back Button (for overlay usage)
export function FloatingBackButton({ className, ...props }: BackButtonProps) {
  return (
    <div
      className={cn(
        "animate-in slide-in-from-left-5 fixed top-4 left-4 z-50 duration-500",
        className,
      )}
    >
      <BackButton
        variant="outline"
        className="bg-background/80 border-border/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
        {...props}
      />
    </div>
  );
}

// Breadcrumb Style Back Button
export function BreadcrumbBackButton({
  items = [],
  className,
  ...props
}: BackButtonProps & { items?: { label: string; href?: string }[] }) {
  const router = useRouter();

  return (
    <nav
      className={cn(
        "text-muted-foreground flex items-center space-x-1 text-sm",
        className,
      )}
    >
      <BackButton
        variant="minimal"
        size="sm"
        showLabel={false}
        className="hover:text-foreground"
        {...props}
      />

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <span>/</span>
          {item.href ? (
            <button
              onClick={() => router.push(item.href!)}
              className="hover:text-foreground transition-colors duration-200 hover:underline"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
