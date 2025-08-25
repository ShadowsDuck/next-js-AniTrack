"use server";

import { auth } from "@/lib/auth";
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
