import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "../../orm/generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(PrismaClient, {
    provider: "postgresql",
  }),
});
