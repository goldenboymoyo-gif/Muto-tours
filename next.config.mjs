/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // The CMS accepts absolute image URLs too, so allow https images from any host.
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