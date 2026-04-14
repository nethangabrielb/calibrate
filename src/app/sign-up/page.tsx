import Link from "next/link";

import { SignupForm } from "@/app/sign-up/components/form";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col bg-muted w-full">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/">
            <img
              src="/calibrate_inverted.svg"
              alt="Calibrate AI"
              className="h-7"
            />
          </Link>
          <Button asChild size="sm" variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Form */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex items-center w-full max-w-sm flex-col gap-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
