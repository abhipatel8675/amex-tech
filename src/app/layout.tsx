import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/site/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { services } from "@/data/services";
import { COMPANY_ADDRESS, OFFICE_PHONE, US_PHONE, CLUTCH_URL } from "@/data/company";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const schibsted = localFont({
  src: [{ path: "../../public/fonts/schibsted-grotesk-latin.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amextechnology.com"),
  title: {
    default: "Amex Technology | Web, App & AI Development Company",
    template: "%s | Amex Technology",
  },
  description:
    "Web, app and AI development company in Ahmedabad, India, building websites, web apps, mobile apps and AI automations for clients in the US, Australia and UK. Free quote.",
  keywords:
    "web development company India, app development company Ahmedabad, AI development agency, AI agents, AI automation, website development, web app development, AI SaaS MVP, mobile app development, GEO, generative engine optimization, AEO, answer engine optimization, SEO services, CRM automation",
  authors: [{ name: "Abhi Patel", url: "https://amextechnology.com/about" }],
  creator: "Amex Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amextechnology.com",
    siteName: "Amex Technology",
    title: "Amex Technology | Web, App & AI Development Company",
    description:
      "Web, app and AI development company in Ahmedabad, India, building websites, web and mobile apps and AI automations for clients in the US, Australia and UK.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Amex Technology: web, app and AI development company in Ahmedabad, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amex Technology | Web, App & AI Development Company",
    description:
      "Web, app and AI development company in Ahmedabad, India, building websites, web and mobile apps and AI automations for clients in the US, Australia and UK.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://amextechnology.com/#organization",
  name: "Amex Technology",
  alternateName: ["AmexTechnology", "Amex Technology India", "amextechnology.com"],
  url: "https://amextechnology.com",
  logo: "https://amextechnology.com/icons/icon-512x512.png",
  description:
    "Web, app and AI development company based in Ahmedabad, India. Builds websites, web apps, mobile apps and AI automations, and provides SEO, GEO and AEO services.",
  // "Amex Technology" is also the name of American Express's internal technology
  // organization; this tells search engines and AI assistants we're a different entity.
  disambiguatingDescription:
    "Independent software and AI agency at amextechnology.com, founded by Abhi Patel. Not affiliated with American Express.",
  foundingDate: "2019",
  founder: {
    "@type": "Person",
    "@id": "https://amextechnology.com/#founder",
    name: "Abhi Patel",
    jobTitle: "Founder and Full-Stack Developer",
    url: "https://amextechnology.com/about",
    homeLocation: { "@type": "Place", name: "Los Angeles, California, United States" },
    sameAs: [
      "https://github.com/abhipatel8675",
      "https://www.fiverr.com/abhipatel956",
    ],
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 2,
    maxValue: 10,
  },
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
  email: "abhi@amextech.org",
  telephone: OFFICE_PHONE.schema,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: OFFICE_PHONE.schema,
      contactType: "customer service",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      telephone: US_PHONE.schema,
      contactType: "sales",
      areaServed: "US",
      availableLanguage: "English",
    },
  ],
  image: "https://amextechnology.com/icons/icon-512x512.png",
  areaServed: ["US", "AU", "GB", "CA", "IN"],
  sameAs: [
    "https://www.fiverr.com/abhipatel956",
    "https://www.instagram.com/amextechnology/",
    "https://www.upwork.com/agencies/2067871097204619852/",
    "https://www.linkedin.com/company/amex-technology/",
    CLUTCH_URL,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_ADDRESS.street,
    addressLocality: COMPANY_ADDRESS.locality,
    addressRegion: COMPANY_ADDRESS.region,
    postalCode: COMPANY_ADDRESS.postalCode,
    addressCountry: COMPANY_ADDRESS.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${inter.variable} h-full antialiased dark`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        {/* Google Search Console verification — replace content value with your verification code */}
        {/* <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" /> */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f7f6f2] text-[#1a211d] antialiased">
        <ScrollProgress />
        <SmoothScroll />
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
