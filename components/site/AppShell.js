"use client";

import ContentProvider from "@/components/site/ContentProvider";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import CookieConsent from "@/components/site/CookieConsent";

export default function AppShell({ children }) {
  return (
    <ContentProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
    </ContentProvider>
  );
}