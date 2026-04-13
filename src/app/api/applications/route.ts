import { NextRequest, NextResponse } from "next/server";

import { isUserAuthenticated } from "@/lib/isAuthenticated";
import prisma from "@/lib/prisma";

export const GET = async (_request: NextRequest) => {
  const { user, isAuthenticated } = await isUserAuthenticated();

  if (!isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        error: "User not authenticated",
        message: "You must be logged in to view applications.",
      },
      { status: 401 },
    );
  }

  try {
    const applications = await prisma.job.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        analyses: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            score: true,
          },
        },
      },
    });

    if (!applications) {
      throw new Error("Failed to fetch applications");
    }

    return NextResponse.json(
      {
        success: true,
        data: applications,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error,
        message: "An error occurred while fetching applications.",
      },
      { status: 500 },
    );
  }
};
