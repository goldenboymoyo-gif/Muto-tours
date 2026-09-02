"use client";

import { usePathname } from "next/navigation";
import SubHeader from "@/components/site/SubHeader";
import SubFooter from "@/components/site/SubFooter";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <SubHeader />}
      <main>{children}</main>
      {!isHome && <SubFooter />}
    </>
  );
}
