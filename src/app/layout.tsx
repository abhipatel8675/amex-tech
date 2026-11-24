import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://amextechnology.com"),
  title: {
    default: "Amex Technology | Websites, Apps & AI for Businesses",
    template: "%s | Amex Technology",
  },
  description:
    "We build websites, web apps, mobile apps and AI automations for businesses worldwide, and help customers find them on Google and in AI search. Free quote.",
  keywords:
    "website development company, app development company, AI automation, AI assistants, website design, web app development, software MVP development, mobile app development, SEO services, AI search visibility, CRM automation",
  authors: [{ name: "Abhi Patel", url: "https://amextechnology.com/about" }],
  creator: "Amex Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amextechnology.com",
    siteName: "Amex Technology",
    title: "Amex Technology | Websites, Apps & AI for Businesses",
    description:
      "We build websites, web and mobile apps and AI automations for businesses worldwide, and help customers find them online.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Amex Technology: websites, apps and AI for businesses worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amex Technology | Websites, Apps & AI for Businesses",
    description:
      "We build websites, web and mobile apps and AI automations for businesses worldwide, and help customers find them online.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://amextechnology.com/#organization",
  name: "Amex Technology",
  alternateName: ["AmexTechnology", "amextechnology.com"],
  url: "https://amextechnology.com",
  logo: "https://amextechnology.com/icons/icon-512x512.png",
  description:
    "Builds websites, web apps, mobile apps and AI automations for businesses worldwide, and provides SEO and AI search visibility services.",
  // "Amex Technology" is also the name of American Express's internal technology
  // organization; this tells search engines and AI assistants we're a different entity.
  disambiguatingDescription:
    "Independent website, app and AI company at amextechnology.com, founded by Abhi Patel. Not affiliated with American Express.",
  foundingDate: "2019",
  founder: {
    "@type": "Person",
    "@id": "https://amextechnology.com/#founder",
    name: "Abhi Patel",
    jobTitle: "Founder",
    url: "https://amextechnology.com/about",
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
    "AI search visibility",
    "GoHighLevel",
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
  areaServed: "Worldwide",
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
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <head>
        <meta name="theme-color" content="#f7f6f2" />
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
      <body className="min-h-full flex flex-col bg-[#f7f6f2] text-[#111111] antialiased">
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
