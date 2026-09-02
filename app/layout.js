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
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
