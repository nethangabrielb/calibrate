"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const isUserAuthenticated = async (): Promise<{
  user: any;
  isAuthenticated: boolean;
}> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;

  return { user, isAuthenticated: !!user };
};
