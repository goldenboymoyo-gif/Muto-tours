"use client";

import { useSiteContent } from "@/components/site/ContentProvider";
import { safeUrl } from "@/lib/safeUrl";

export default function WhatsAppButton({ label = "Chat on WhatsApp", className = "" }) {
  const { content } = useSiteContent();
  const brand = content.brand;
  const href = safeUrl(brand.contact.whatsappHref);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium text-river hover:text-clay transition-colors ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.16c-.25.7-1.24 1.28-2.03 1.45-.55.12-1.26.21-3.67-.79-3.08-1.28-5.06-4.42-5.21-4.62-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.56c.28-.31.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.08.93 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.32-.13.62.17.31.77 1.27 1.66 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.48.13.66-.08.18-.2.77-.9.98-1.21.2-.31.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.72-.17 1.41z" />
      </svg>
      {label}
    </a>
  );
}
