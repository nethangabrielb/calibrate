import Link from "next/link";

import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/">
            <img
              src="/calibrate_inverted.svg"
              alt="Calibrate AI"
              className="h-7"
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: April 14, 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-base font-medium">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By creating an account or using Calibrate AI, you agree to these
              Terms of Service. If you do not agree, please do not use the
              service. We may update these terms at any time, and continued use
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">
              2. Description of Service
            </h2>
            <p className="mt-2">
              Calibrate AI is a web application that allows users to track job
              applications and run AI-powered analyses that compare resume
              content against job descriptions. The service provides fit scores,
              skill matching, and recommendations. The AI analysis is powered by
              third-party language models and should be treated as a supplemental
              tool, not a definitive assessment.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">3. User Accounts</h2>
            <div className="mt-2 space-y-2">
              <p>
                You are responsible for maintaining the security of your account
                credentials. You must provide accurate information when creating
                an account. Each account is for individual use — do not share
                your login credentials with others.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that
                violate these terms or engage in abusive behavior.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium">4. Acceptable Use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-foreground/80">
              <li>
                Use the service for any unlawful purpose or in violation of any
                applicable laws
              </li>
              <li>
                Attempt to circumvent rate limits, authentication, or
                authorization controls
              </li>
              <li>
                Submit content that is intentionally harmful, misleading, or
                designed to exploit the AI analysis system
              </li>
              <li>
                Use automated tools to scrape, crawl, or programmatically
                interact with the service without permission
              </li>
              <li>
                Reverse-engineer, decompile, or attempt to extract source code
                from the service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium">5. Your Content</h2>
            <div className="mt-2 space-y-2">
              <p>
                You retain ownership of all content you submit to Calibrate AI,
                including job application details and resume text. By using the
                AI analysis feature, you grant us permission to send your resume
                text and the relevant job description to our AI provider (Mistral
                AI) for the purpose of generating your analysis.
              </p>
              <p>
                You are solely responsible for the accuracy and legality of the
                content you submit. Do not submit content that contains sensitive
                personal information of third parties without their consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium">
              6. AI Analysis Disclaimer
            </h2>
            <div className="mt-2 space-y-2">
              <p>
                The AI-generated analyses, scores, and recommendations are
                provided &quot;as is&quot; for informational purposes only. They
                are produced by machine learning models and may contain
                inaccuracies, biases, or errors.
              </p>
              <p>
                Calibrate AI does not guarantee the accuracy, completeness, or
                reliability of any AI-generated output. Do not rely solely on AI
                analysis results for career decisions. The scores and
                recommendations are meant to be one input in your
                decision-making process, not a substitute for your own judgment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium">7. Rate Limits</h2>
            <p className="mt-2">
              AI analysis requests are rate-limited to 8 requests per hour per
              user. This limit exists to ensure fair usage and manage costs. We
              reserve the right to adjust rate limits at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">8. Service Availability</h2>
            <p className="mt-2">
              We aim to keep Calibrate AI available at all times but do not
              guarantee uninterrupted service. The service may be temporarily
              unavailable due to maintenance, updates, or circumstances beyond
              our control. We are not liable for any loss or inconvenience caused
              by downtime.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Calibrate AI and its
              developer shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use
              of the service. This includes, but is not limited to, damages
              resulting from reliance on AI-generated analysis, loss of data, or
              inability to access the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">10. Termination</h2>
            <p className="mt-2">
              You may stop using the service at any time. We may suspend or
              terminate your access if you violate these terms. Upon
              termination, your right to use the service ceases immediately. You
              may request deletion of your data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium">11. Contact</h2>
            <p className="mt-2">
              If you have questions about these Terms of Service, you can reach
              us at{" "}
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

export default TermsOfService;
