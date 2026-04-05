import { SignupForm } from "@/app/sign-up/components/form";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 w-full">
      <div className="flex items-center w-full max-w-sm flex-col gap-6">
        <div className="w-full h-full scale-125 translate-y-4">
          <img
            src="/calibrate_inverted.svg"
            alt="Calibrate AI Logo"
            className="object-cover w-full dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
