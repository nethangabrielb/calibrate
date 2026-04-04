"use client";

import { login } from "@/actions/auth";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.success) {
      // show a success message
      toast.success(state.message);

      // redirect to dashboard page
      router.push("/dashboard");
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Calibrate AI account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className={cn(state?.errors && "border-destructive")}
                  required
                />
                {state?.errors && (
                  <FieldDescription className="text-destructive text-xs">
                    {(state.errors.password as string[])[0] ||
                      (state.errors.email as string[])[0]}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className={cn(state?.errors && "border-destructive")}
                  required
                />
                {state?.errors && (
                  <FieldDescription className="text-destructive text-xs">
                    {(state.errors.password as string[])[0] ||
                      (state.errors.email as string[])[0]}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  Login
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>
              <Button variant="outline" type="button">
                <SiGoogle></SiGoogle>
                <span>Continue with Google</span>
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="hidden bg-muted md:block">
            <img
              src="/illustration.svg"
              alt="Image"
              className="object-cover scale-80 translate-x-8 -translate-y-6 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
