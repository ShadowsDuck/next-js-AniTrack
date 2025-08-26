"use server";

import { db } from "@/db/drizzle";
import { InsertFavorite, favorites } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getUserId = async (): Promise<string | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user?.id ?? null;
  } catch (error) {
    console.error("Failed to get user session", error);
    return null;
  }
};

export const getFavorites = async () => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found", userFavorites: [] };
    }

    const userFavorites = await db.query.favorites.findMany({
      where: eq(favorites.userId, userId),
      orderBy: [desc(favorites.createdAt)],
    });

    return { success: true, userFavorites };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get favorites",
      userFavorites: [],
    };
  }
};

export const getFavoriteById = async (malId: number) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const favorite = await db.query.favorites.findFirst({
      where: and(eq(favorites.malId, malId), eq(favorites.userId, userId)),
      with: {
        user: true,
      },
    });

    if (!favorite) {
      return { success: false, message: "Favorite not found" };
    }

    return { success: true, favorite };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to get favorite",
    };
  }
};

export const addFavorite = async ({
  malId,
  title,
  image,
  type,
}: Omit<InsertFavorite, "userId">) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found", userPlants: [] };
    }

    await db.insert(favorites).values({ malId, title, image, type, userId });

    return { success: true, message: "Add favorite successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to add favorite",
    };
  }
};

export const removeFavorite = async (malId: number) => {
  try {
    await db.delete(favorites).where(eq(favorites.malId, malId));
    return { success: true, message: "Favorite removed successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete favorite",
    };
  }
};
