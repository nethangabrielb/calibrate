import { faker } from "@faker-js/faker";

import prisma from "@/lib/prisma";

const USER_ID = "Ta9UWcokcMNAEQfQYKLvr89fgQprjUrm";

const JOB_STATUSES = [
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
] as const;

const TECH_COMPANIES = [
  "Vercel",
  "Stripe",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
  "PlanetScale",
  "Fly.io",
  "Cloudflare",
  "Railway",
  "Render",
  "Shopify",
  "Atlassian",
  "HashiCorp",
  "Datadog",
  "Sentry",
];

const DEV_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Software Engineer",
  "Junior Software Engineer",
  "React Developer",
  "Node.js Developer",
  "TypeScript Engineer",
  "DevOps Engineer",
  "Site Reliability Engineer",
  "Platform Engineer",
];

const CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD", "PHP"];

async function seed() {
  console.log(`🌱 Seeding jobs for user ${USER_ID}...`);

  const user = await prisma.user.findUnique({ where: { id: USER_ID } });

  if (!user) {
    console.error(`❌ No user found with ID: ${USER_ID}`);
    process.exit(1);
  }

  const deletedJobs = await prisma.job.deleteMany({
    where: { userId: USER_ID },
  });

  console.log(
    `🧹 Deleted ${deletedJobs.count} existing jobs for ${user.email}.`,
  );

  const jobCount = 25;

  await Promise.all(
    Array.from({ length: jobCount }).map(() => {
      const hasSalary = faker.datatype.boolean();

      return prisma.job.create({
        data: {
          userId: USER_ID,
          company: faker.helpers.arrayElement(TECH_COMPANIES),
          title: faker.helpers.arrayElement(DEV_ROLES),
          description: faker.lorem.paragraphs({ min: 2, max: 4 }),
          location: faker.helpers.maybe(
            () =>
              faker.datatype.boolean()
                ? "Remote"
                : `${faker.location.city()}, ${faker.location.country()}`,
            { probability: 0.8 },
          ),
          salary: hasSalary
            ? faker.number.int({ min: 40_000, max: 200_000 })
            : null,
          salaryCurrency: hasSalary
            ? faker.helpers.arrayElement(CURRENCIES)
            : null,
          status: faker.helpers.arrayElement(JOB_STATUSES),
          createdAt: faker.date.recent({ days: 90 }),
        },
      });
    }),
  );

  console.log(`🎉 Done! Seeded ${jobCount} jobs for ${user.email}.`);
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
