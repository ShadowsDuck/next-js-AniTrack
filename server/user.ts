"use server";

import { db } from "@/db/drizzle";
import { InsertFavorite, favorites } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
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

export const addFavorite = async ({
  malId,
  title,
  image,
  type,
}: InsertFavorite) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, message: "User not found", userPlants: [] };
    }

    await db.insert(favorites).values({ malId, title, image, type, userId });

    return { success: true, message: "add favorite successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to add favorite",
    };
  }
};

export const deleteFavorite = async (malId: number) => {
  try {
    await db.delete(favorites).where(eq(favorites.malId, malId));
    return { success: true, message: "Favorite deleted successfully" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete favorite",
    };
  }
};
