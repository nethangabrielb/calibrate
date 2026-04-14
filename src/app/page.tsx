import { ArrowRight, BarChart3, ClipboardList, Sparkles } from "lucide-react";

import Link from "next/link";
import { headers } from "next/headers";

import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";

const features = [
  {
    icon: ClipboardList,
    title: "Track everything",
    description:
      "Company, role, salary, status, description — all in one place with sorting and search.",
  },
  {
    icon: Sparkles,
    title: "AI fit analysis",
    description:
      "Paste your resume against any job description. Get a calibrated score, skill breakdown, and actionable next steps.",
  },
  {
    icon: BarChart3,
    title: "See the big picture",
    description:
      "Dashboard with totals, averages, status breakdowns, and your most recent activity.",
  },
];

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user || null;

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/">
            <img
              src="/calibrate_inverted.svg"
              alt="Calibrate AI"
              className="size-96 pt-2"
            />
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="mr-2 hidden text-sm text-muted-foreground sm:inline">
                  Logged in as {user.email}
                </span>
                <Button asChild size="sm" variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <SignOutButton />
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 pt-28 pb-20 text-center sm:pt-36">
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Know where you stand before you apply.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Calibrate tracks your job applications and uses AI to measure how well
          your resume fits each role — so you can focus on the ones worth your
          time.
        </p>
        <div className="mt-10 flex gap-3">
          {user ? (
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Start tracking
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Log in</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* What it does */}
      <section className="border-t border-border px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-3 sm:gap-8">
          {features.map((feature) => (
            <div key={feature.title}>
              <feature.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-medium">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Calibrate AI</p>
          <p>Made with ❤️ by nethangabrielb</p>
          <div className="flex gap-2">
            <a
              href="https://github.com/nethangabrielb/calibrate"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              >
            GitHub
            </a>
            <a href="https://www.linkedin.com/in/nethangabrielb" target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home
