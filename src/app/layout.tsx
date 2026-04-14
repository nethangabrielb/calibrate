import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";

import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { auth } from "@/lib/auth";

import QueryProvider from "@/providers/query-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calibrate AI",
  description:
    "Track your job applications and use AI to measure how well your resume fits each role.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // Requires passing the request headers
  });

  const user = session?.user || null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" theme="light" />
        {/* Sidebar here only visible for authenticated users */}
        <main className="flex flex-col min-h-svh w-full overflow-hidden lg:flex-row">
          <Sidebar user={user} />
          <div className="h-full min-w-0 flex-1 overflow-auto">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
