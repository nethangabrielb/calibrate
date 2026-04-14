import { NextRequest, NextResponse } from "next/server";

import { isUserAuthenticated } from "@/lib/isAuthenticated";
import prisma from "@/lib/prisma";

const fetchTotalApplications = async (userId: string) =>
  prisma.job.count({ where: { userId } });
const fetchAverageScores = async (userId: string) => {
  const applications = await prisma.job.findMany({
    where: { userId },
    include: {
      analyses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          score: true,
        },
      },
    },
  });

  let analysisCounts = 0;
  let score = 0;
  applications.forEach((application) => {
    if (application.analyses.length > 0) {
      score += application.analyses[0].score;
      analysisCounts += 1;
    }
  });

  return analysisCounts === 0 ? 0 : Math.round(score / analysisCounts);
};

const fetchActiveApplications = async (userId: string) => {
  const activeApplications = await prisma.job.count({
    where: {
      userId,
      status: {
        notIn: ["OFFERED", "REJECTED"],
      },
    },
  });

  return activeApplications ?? 0;
};

const fetchOffers = async (userId: string) => {
  const offeredApplications = await prisma.job.count({
    where: {
      userId,
      status: "OFFERED",
    },
  });

  return offeredApplications;
};

const fetchChartData = async (userId: string) => {
  const chartData = await prisma.job.groupBy({
    where: {
      userId,
    },
    by: ["status"],
    _count: {
      _all: true,
    },
  });

  return chartData;
};

const fetchMostRecentApplications = async (userId: string) => {
  const recentApplications = await prisma.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return recentApplications;
};

export const GET = async (request: NextRequest) => {
  const { user, isAuthenticated } = await isUserAuthenticated();

  if (!user || !isAuthenticated) {
    return NextResponse.json(
      {
        success: false,
        error: "User not authenticated.",
        message: "You must be logged in to view dashboard data.",
      },
      { status: 401 },
    );
  }

  try {
    const [
      totalApplications,
      averageScore,
      activeApplications,
      offeredApplications,
      applicationsChartData,
      recentApplications,
    ] = await Promise.all([
      fetchTotalApplications(user.id),
      fetchAverageScores(user.id),
      fetchActiveApplications(user.id),
      fetchOffers(user.id),
      fetchChartData(user.id),
      fetchMostRecentApplications(user.id),
    ]);

    return NextResponse.json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: {
        totalApplications,
        averageScore,
        activeApplications,
        offeredApplications,
        applicationsChartData,
        recentApplications,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
        message: "An unexpected error occured. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
};
