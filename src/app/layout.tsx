import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Amex Technology | Software Development Agency",
    template: "%s | Amex Technology",
  },
  description:
    "Amex Technology is a premium software development agency. We build scalable web applications, mobile apps, SaaS platforms, and digital products for startups and enterprises.",
  keywords:
    "software development agency, web development, mobile app development, SaaS development, Next.js, React, TypeScript, API development, DevOps, UI/UX design",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amex-tech.vercel.app",
    siteName: "Amex Technology",
    title: "Amex Technology | Software Development Agency",
    description:
      "We build scalable digital products for startups and modern businesses. Web apps, mobile apps, SaaS platforms, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amex Technology | Software Development Agency",
    description:
      "We build scalable digital products for startups and modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#E2E8F0] antialiased">{children}</body>
    </html>
  );
}
