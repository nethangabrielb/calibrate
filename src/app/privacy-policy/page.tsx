import Link from "next/link";

import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/">
            <img
              src="/calibrate_inverted.svg"
              alt="Calibrate AI"
              className="size-96 pt-2"
            />
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: April 14, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-base font-medium">1. Introduction</h2>
            <p className="mt-2">
              Calibrate AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              is a job application tracking and AI-powered resume analysis tool.
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">
              2. Information We Collect
            </h2>
            <div className="mt-2 space-y-3">
              <div>
                <h3 className="font-medium text-foreground/80">
                  Account Information
                </h3>
                <p className="mt-1">
                  When you create an account, we collect your name, email
                  address, and password (hashed). If you sign in with Google, we
                  receive your name, email, and profile picture from Google.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground/80">
                  Job Application Data
                </h3>
                <p className="mt-1">
                  You may enter job application details including company names,
                  job titles, descriptions, locations, salaries, and application
                  statuses. This data is stored in your account and is only
                  accessible to you.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground/80">
                  Resume Content
                </h3>
                <p className="mt-1">
                  When you use the AI analysis feature, you paste resume text
                  into the application. This text is sent to a third-party AI
                  provider (Mistral AI) for analysis and is stored alongside the
                  generated analysis results.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground/80">
                  Session &amp; Usage Data
                </h3>
                <p className="mt-1">
                  We collect session information including IP addresses and user
                  agent strings for authentication and security purposes. We use
                  Upstash Redis for rate limiting, which tracks request counts
                  per user.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium">
              3. How We Use Your Information
            </h2>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-foreground/80">
              <li>
                To provide and maintain the Calibrate AI service, including job
                tracking and AI analysis
              </li>
              <li>
                To authenticate your identity and secure your account
              </li>
              <li>
                To send your resume text to Mistral AI for analysis when you
                explicitly request it
              </li>
              <li>
                To enforce rate limits and prevent abuse of the AI analysis
                feature
              </li>
              <li>
                To improve the service based on aggregate, non-identifying usage
                patterns
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium">
              4. Third-Party Services
            </h2>
            <div className="mt-2 space-y-3">
              <div>
                <h3 className="font-medium text-foreground/80">Mistral AI</h3>
                <p className="mt-1">
                  When you run an AI analysis, your resume text and the
                  corresponding job description are sent to Mistral AI for
                  processing. Mistral AI processes this data according to their
                  own privacy policy. We do not send any other personal
                  information to Mistral AI.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground/80">
                  Google OAuth
                </h3>
                <p className="mt-1">
                  If you choose to sign in with Google, we receive basic profile
                  information (name, email, profile picture) from Google. We do
                  not access any other Google data.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground/80">
                  Upstash Redis
                </h3>
                <p className="mt-1">
                  We use Upstash Redis for rate limiting the AI analysis feature.
                  Only your user ID and request timestamps are stored, and this
                  data is automatically expired.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium">5. Data Storage &amp; Security</h2>
            <p className="mt-2">
              Your data is stored in a PostgreSQL database. Passwords are hashed
              using bcrypt before storage. Sessions use HTTP-only, secure cookies
              with SameSite protection. We implement authorization checks on
              every request to ensure you can only access your own data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">6. Data Retention</h2>
            <p className="mt-2">
              Your account data and job applications are retained as long as your
              account is active. AI analysis results are stored indefinitely
              alongside the associated job application. When you delete a job
              application, all associated analyses are also permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">7. Your Rights</h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-foreground/80">
              <li>Access all data stored in your account</li>
              <li>Update or correct your personal information</li>
              <li>
                Delete individual job applications and their associated analyses
              </li>
              <li>
                Request deletion of your account and all associated data by
                contacting us
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium">
              8. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected by updating the &quot;Last updated&quot; date at
              the top of this page. Continued use of the service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">9. Contact</h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, you can reach us
              at{" "}
              <a
                href="mailto:bagasbas.nethangabriel@gmail.com"
                className="text-primary underline-offset-2 hover:underline"
              >
                bagasbas.nethangabriel@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
