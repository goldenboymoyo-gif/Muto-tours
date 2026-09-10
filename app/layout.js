import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/archivo-black/400.css";
import "./globals.css";
import AppShell from "@/components/site/AppShell";
import { getContent } from "@/lib/content";
import { brand as defaultBrand } from "@/data/brand";

const SITE_URL = "https://mutotours-travel.com";

export async function generateMetadata() {
  const content = await getContent();
  const { brand } = content;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${brand.name} — ${brand.tagline}`,
      template: `%s — ${brand.name}`,
    },
    description: brand.shortStatement,
    alternates: {
      canonical: "/",
    },
    keywords: [
      "Victoria Falls tours",
      "Zimbabwe safari",
      "Southern Africa tours",
      "Zambezi cruise",
      "Hwange National Park safari",
      "Okavango Delta",
      "Sossusvlei tours",
      "Chobe National Park",
    ],
    openGraph: {
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.shortStatement,
      url: SITE_URL,
      siteName: brand.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/slide2.jpg`,
          width: 1200,
          height: 800,
          alt: `${brand.name} — ${brand.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.shortStatement,
      images: [`${SITE_URL}/images/slide2.jpg`],
    },
  };
}

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: defaultBrand.fullName || defaultBrand.name,
        alternateName: defaultBrand.name,
        url: SITE_URL,
        logo: `${SITE_URL}/images/muto-logo.png`,
        image: [
          `${SITE_URL}/images/slide2.jpg`,
          `${SITE_URL}/images/vicfalls.jpg`,
          `${SITE_URL}/images/namibia.jpg`,
        ],
        slogan: defaultBrand.tagline,
        description: defaultBrand.shortStatement,
        email: defaultBrand.contact.email,
        telephone: defaultBrand.contact.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: defaultBrand.contact.address.line2,
          addressLocality: "Victoria Falls",
          addressCountry: "ZW",
        },
        sameAs: [defaultBrand.social.instagram, defaultBrand.social.facebook],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: defaultBrand.contact.phoneHref.replace("tel:", ""),
          contactType: "sales",
          email: defaultBrand.contact.email,
          availableLanguage: ["English"],
        },
        areaServed: ["Zimbabwe", "Botswana", "Namibia", "South Africa"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: defaultBrand.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/slide1.jpg" fetchPriority="high" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
