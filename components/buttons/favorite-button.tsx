"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { addFavorite, removeFavorite } from "@/server/user";
import { InsertFavorite } from "@/db/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps extends Omit<InsertFavorite, "userId"> {
  initialIsFavorite: boolean;
}

export default function FavoriteButton({
  malId,
  title,
  image,
  type,
  initialIsFavorite,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const res = await removeFavorite(malId);

        if (!res.success) {
          if (res.message && res.message !== "User not found") {
            toast.error(res.message);
          }
          if (res.message === "User not found") return router.push("/sign-in");
          return;
        }

        toast.success(res.message);
        setIsFavorite(false);
        setShouldAnimate(false);
      } else {
        const res = await addFavorite({ malId, title, image, type });

        if (!res.success) {
          if (res.message && res.message !== "User not found") {
            toast.error(res.message);
          }
          if (res.message === "User not found") return router.push("/sign-in");
          return;
        }

        toast.success(res.message);
        setIsFavorite(true);
        setShouldAnimate(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="hover:bg-muted/50 w-full flex-1 border-2 transition-all duration-300 hover:text-[#EF4444] sm:flex-initial"
      onClick={handleFavorite}
      asChild
    >
      <IconButton
        icon={Heart}
        active={isFavorite}
        color={[239, 68, 68]}
        size="md"
        animate={shouldAnimate}
        transition={shouldAnimate === false ? { duration: 0 } : undefined}
        disabled={isLoading}
      />
    </Button>
  );
}
