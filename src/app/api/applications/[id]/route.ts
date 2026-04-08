import { NextRequest, NextResponse } from "next/server";

import { isUserAuthenticated } from "@/lib/isAuthenticated";
import prisma from "@/lib/prisma";

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { user, isAuthenticated } = await isUserAuthenticated();

  const { id } = await params;

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
    const application = await prisma.job.findMany({
      where: { userId: user.id, id: Number(id) },
      include: {
        analyses: {
          select: {
            score: true,
          },
        },
      },
    });

    console.log(application);

    if (!application) {
      throw new Error("Failed to fetch application");
    }

    return NextResponse.json(
      {
        success: true,
        data: application,
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
