import Link from "next/link";

import { LoginForm } from "@/app/login/components/login-form";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex w-full min-h-svh flex-col bg-muted">
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
          <Button asChild size="sm">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </header>

      {/* Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
