"use client";

import { signup } from "@/actions/auth";
import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.success) {
      // show a success message
      toast.success(state.message);

      // redirect to login page
      router.push("/login");
    }
  }, [state]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                {state?.errors?.name &&
                  state.errors.name.map((error, index) => (
                    <FieldDescription
                      key={index}
                      className="text-destructive text-xs"
                    >
                      {error}
                    </FieldDescription>
                  ))}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {state?.errors?.email &&
                  state.errors.email.map((error, index) => (
                    <FieldDescription
                      key={index}
                      className="text-destructive text-xs"
                    >
                      {error}
                    </FieldDescription>
                  ))}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                    {state?.errors?.password &&
                      state.errors.password.map((error, index) => (
                        <FieldDescription
                          key={index}
                          className="text-destructive text-xs"
                        >
                          {error}
                        </FieldDescription>
                      ))}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                    {state?.errors?.confirmPassword &&
                      state.errors.confirmPassword.map((error, index) => (
                        <FieldDescription
                          key={index}
                          className="text-destructive text-xs"
                        >
                          {error}
                        </FieldDescription>
                      ))}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 12 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                  disabled={pending}
                >
                  {pending ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
