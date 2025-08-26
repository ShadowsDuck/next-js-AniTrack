import Link from "next/link";
import { Button } from "../ui/button";

interface BrowseButtonProps {
  to: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function BrowseButton({
  to,
  variant = "default",
  size = "default",
}: BrowseButtonProps) {
  return (
    <Link href={to}>
      <Button variant={variant} size={size}>
        {to === "/anime" ? "Browse Anime" : "Browse Manga"}
      </Button>
    </Link>
  );
}
