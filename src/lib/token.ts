import "server-only";

import { cookies } from "next/headers";

export const createHttpCookieToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
};
