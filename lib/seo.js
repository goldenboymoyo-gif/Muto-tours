// ---------------------------------------------------------------------------
// Page-level SEO metadata helper.
//
// Every sub-page exports a `metadata` object (or `generateMetadata`), and each
// one needs the same three blocks: a canonical URL, Open Graph tags, and a
// Twitter card. This keeps that consistent and avoids pages silently skipping
// one of them. The title still flows through the root layout's template
// (`%s — Muto Tours`), so go live and social titles match everywhere.
// ---------------------------------------------------------------------------

export const SITE_URL = "https://mutotours-travel.com";

export function pageMetadata({ path, title, description, image, type = "website" }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Muto Tours",
      locale: "en_US",
      type,
      images: image
        ? [
            {
              url: `${SITE_URL}${image}`,
              width: 1200,
              height: 800,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [`${SITE_URL}${image}`] : undefined,
    },
  };
}