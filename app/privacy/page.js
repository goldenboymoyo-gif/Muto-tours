import { getContent } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Muto Tours collects, uses, and protects the personal information you share through this website.",
};

export default async function PrivacyPage() {
  const { brand } = await getContent();

  return (
    <div className="bg-sand">
      <section className="container-editorial pt-16 md:pt-24">
        <p className="text-xs uppercase tracking-widest2 text-clay">Legal</p>
        <h1 className="mt-3 font-archivo uppercase text-3xl md:text-5xl text-ink">Privacy Policy</h1>
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Last updated: [PLACEHOLDER — insert review date]. This policy explains what we collect
          through this website, why we collect it, and the choices you have.
        </p>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-3xl space-y-8 text-sm md:text-base leading-relaxed text-ink/80">
          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Who we are</h2>
            <p>
              This website is operated by {brand.fullName}, based in {brand.contact.address.line1}{" "}
              ({brand.contact.address.line3}).
            </p>
            <p className="mt-3">
              [PLACEHOLDER — confirm the exact legal entity/registration details and registered
              address for your jurisdiction's privacy law.]
            </p>
            <p className="mt-3">
              You can reach us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">What we collect</h2>
            <p>The enquiry and newsletter forms ask you for voluntary information:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Name, email address, and phone number (so we can reply to your enquiry);</li>
              <li>Trip details you choose to share: destination interest, rough travel dates, and party size;</li>
              <li>Your message.</li>
            </ul>
            <p className="mt-3">
              We don&apos;t require an account to use this site, and we don&apos;t ask for payment details online.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">How we use it</h2>
            <ul className="ml-4 list-disc space-y-1">
              <li>To prepare and send a personalised trip quotation, communicating with you by email or WhatsApp as you prefer;</li>
              <li>To keep records of enquiries we receive, including as a travel operator responding to booking requests;</li>
              <li>To send you a confirmation of anything you submit.</li>
            </ul>
            <p className="mt-3">
              We do not sell personal information, and we do not use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Legal basis</h2>
            <p>
              [PLACEHOLDER — choose and record the lawful basis (e.g. "legitimate interest in
              responding to enquiries we receive", or "steps taken at your request to provide a
              quotation") and, where required by your applicable law, the retention period for
              enquiry records.]
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">How long we keep it</h2>
            <p>
              [PLACEHOLDER — state how long enquiry messages are retained before deletion, e.g.
              24 months, and where backups may retain them for a further short period.]
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Sharing</h2>
            <p>
              We share personal information only with the operators needed to build your trip
              (guides, lodges, activity providers) when you go ahead with a booking, and with the
              hosting providers that keep this website running. We don&apos;t sell it or hand it to
              third parties for their own marketing.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Your rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, or delete the
              personal information we hold about you, and to object to or restrict certain uses.
              To exercise any of these, email us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>
              . We&apos;ll respond within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Cookies</h2>
            <p>
              We use a small number of cookies to keep the site working and to remember your cookie
              preference. See the{" "}
              <a href="/cookies" className="border-b border-clay/40 pb-0.5 text-clay">
                Cookie Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Security</h2>
            <p>
              The site is delivered over HTTPS, enquiry data is transmitted over encrypted
              connections, and admin access is protected. No transmission or storage method is
              100% secure, but we follow current good practice.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Contact</h2>
            <p>
              For any privacy question, contact us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>
              . [PLACEHOLDER — add a named data-protection contact or supervisory authority
              details if required by your jurisdiction.]
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}