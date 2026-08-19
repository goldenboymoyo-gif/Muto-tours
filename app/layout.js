// Self-hosted, static-weight fonts (no Google Fonts network dependency at
// build or runtime — more reliable for both this build and low-connectivity
// visitors; static weights instead of variable-font files sidestep some
// headless-renderer glyph quirks). Fraunces brings the editorial, human
// character called for in the brief; Inter carries body copy cleanly at
// small sizes.
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brand } from "@/data/brand";

export const metadata = {
  metadataBase: new URL("https://mutotours.africa"),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.shortStatement,
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
    url: "https://mutotours.africa",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.shortStatement,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-clay focus:text-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
