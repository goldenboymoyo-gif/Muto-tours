"use client";

import { usePathname } from "next/navigation";
import ContentProvider from "@/components/site/ContentProvider";
import SubHeader from "@/components/site/SubHeader";
import SubFooter from "@/components/site/SubFooter";
import CookieConsent from "@/components/site/CookieConsent";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ContentProvider>
      {!isHome && <SubHeader />}
      <main>{children}</main>
      {!isHome && <SubFooter />}
      <CookieConsent />
    </ContentProvider>
  );
}
