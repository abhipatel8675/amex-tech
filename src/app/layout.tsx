import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { services } from "@/data/services";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amextechnology.com"),
  title: {
    default: "Amex Technology — AI & Software Development Agency",
    template: "%s | Amex Technology",
  },
  description:
    "Amex Technology is an independent AI and software development agency, founded in 2019. We build AI agents and automations, websites and web apps, AI SaaS MVPs and mobile apps, and grow your visibility on Google and AI assistants with SEO, GEO and AEO.",
  keywords:
    "AI development agency, AI agents, AI automation, website development, web app development, AI SaaS MVP, mobile app development, GEO, generative engine optimization, AEO, answer engine optimization, SEO services, GoHighLevel, CRM automation, Next.js, Supabase, Lovable app fixes",
  authors: [{ name: "Abhi Patel", url: "https://amextechnology.com/about" }],
  creator: "Amex Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amextechnology.com",
    siteName: "Amex Technology",
    title: "Amex Technology — AI & Software Development Agency",
    description:
      "AI agents, websites, web apps, SaaS and mobile apps, plus SEO, GEO and AEO, built by one independent agency.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Amex Technology — AI & Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amex Technology — AI & Software Development Agency",
    description:
      "AI agents, websites, web apps, SaaS and mobile apps, plus SEO, GEO and AEO, built by one independent agency.",
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
  alternateName: ["Amex Technology Agency", "amextechnology.com"],
  url: "https://amextechnology.com",
  logo: "https://amextechnology.com/images/logo.png",
  description:
    "Independent AI and software development agency that builds AI agents, websites, web apps, SaaS products and mobile apps, and provides SEO, GEO and AEO services.",
  // "Amex Technology" is also the name of American Express's internal technology
  // organization; this tells search engines and AI assistants we're a different entity.
  disambiguatingDescription:
    "Independent software and AI agency at amextechnology.com, founded by Abhi Patel in 2019. Not affiliated with American Express.",
  foundingDate: "2019",
  founder: {
    "@type": "Person",
    "@id": "https://amextechnology.com/#founder",
    name: "Abhi Patel",
    jobTitle: "Founder and Full-Stack Developer",
    url: "https://amextechnology.com/about",
    sameAs: ["https://github.com/abhipatel8675", "https://www.fiverr.com/abhipatel956"],
  },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
  knowsAbout: [
    ...services.map((s) => s.title),
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Next.js",
    "Supabase",
    "React Native",
    "GoHighLevel",
    "OpenAI API",
  ],
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
        <meta name="theme-color" content="#FFFFFF" />
        {/* Google Search Console verification — replace content value with your verification code */}
        {/* <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" /> */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-700 antialiased">
        <ScrollProgress />
        {children}
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RLBM20P7Z4"
          strategy="lazyOnload"
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
