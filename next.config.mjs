/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const nextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF intentionally omitted (webp only): Next.js 14's AVIF path is the
    // subject of GHSA-2xp9-vwfh-vxw4 (unauthenticated RCE in the Image
    // Optimization API via AVIF), disclosed after this site's September 2026
    // security pass. Because remotePatterns below allows any https host (the
    // CMS accepts arbitrary image URLs), the public /_next/image endpoint is
    // reachable by anyone with no admin access needed, so this isn't a
    // theoretical risk. Removing "image/avif" closes the specific trigger
    // with zero visible change (webp still serves every modern browser; older
    // browsers already fall back to the original format). Re-add once the
    // project upgrades to a patched Next.js release (see SECURITY.md).
    formats: ["image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // The CMS accepts absolute image URLs too, so allow https images from any
    // host. Trade-off: this also means the Image Optimizer will server-side
    // fetch whatever https URL an admin (or anyone who compromises the admin
    // password) supplies, which is an SSRF surface in principle. Accepted for
    // now since this is a single-trusted-admin CMS with no internal network
    // to pivot into from Vercel's serverless environment; revisit with a
    // trusted-host allowlist if that trust model ever changes.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];

    if (isProd) {
      securityHeaders.push({ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" });
    }

    // Content-Security-Policy rationale:
    //  - script-src: Next.js 14 injects inline bootstrap scripts for hydration
    //    and the RSC payload, so an inline allowance is required. No third-party
    //    scripts are loaded anywhere on the site. (Migration path to nonces is
    //    noted in SECURITY.md.)
    //  - style-src 'unsafe-inline': the sub-pages set inline style attributes
    //    and PageHero/animations apply inline styles via GSAP.
    //  - img-src https: allows admin-supplied remote image URLs and the
    //    OpenStreetMap tile server used by the route map.
    //  - connect-src 'self' + API: the enquiry/subscribe/admin calls hit the
    //    backend cross-origin (plus the local dev server).
    let csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' https: data: blob:`,
      "font-src 'self' data:",
      `connect-src 'self' ${API_URL}`,
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ];
    if (isProd) {
      csp.push("upgrade-insecure-requests");
    }
    securityHeaders.push({ key: "Content-Security-Policy", value: csp.join("; ") });

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;