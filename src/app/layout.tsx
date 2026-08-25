import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amextechnology.com"),
  title: {
    default: "Amex Technology — Software Development Agency",
    template: "%s | Amex Technology",
  },
  description:
    "Amex Technology is a premium software development agency with 5+ years of experience and 200+ projects delivered. We build scalable web apps, mobile apps, SaaS platforms, and provide SEO services and AI automation for startups and enterprises.",
  keywords:
    "software development agency, web development, mobile app development, SaaS development, Next.js, React, TypeScript, API development, DevOps, UI/UX design, SEO services, AI automation, n8n, Zapier, workflow automation, technical SEO, search engine optimization",
  authors: [{ name: "Amex Technology" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amextechnology.com",
    siteName: "Amex Technology",
    title: "Amex Technology — Software Development Agency",
    description:
      "We build scalable digital products for startups and modern businesses. Web apps, mobile apps, SaaS platforms, and more.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Amex Technology — Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amex Technology — Software Development Agency",
    description:
      "We build scalable digital products for startups and modern businesses.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://amextechnology.com/#organization",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  logo: "https://amextechnology.com/images/logo.png",
  foundingDate: "2019",
  email: "abhipatel8675@gmail.com",
  sameAs: [
    "https://www.fiverr.com/abhipatel956",
    "https://www.instagram.com/amextechnology/",
    "https://www.upwork.com/agencies/2067871097204619852/",
    "https://www.linkedin.com/company/amex-technology/",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
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
      <head>
        <meta name="theme-color" content="#0B0F19" />
        {/* Google Search Console verification — replace content value with your verification code */}
        {/* <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" /> */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#E2E8F0] antialiased">
        <ScrollProgress />
        <CustomCursor />
        {children}
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RLBM20P7Z4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RLBM20P7Z4');
          `}
        </Script>
      </body>
    </html>
  );
}
