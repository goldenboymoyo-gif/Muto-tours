import { getContent } from "@/lib/content";

export const metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Muto Tours website and enquire about or book a trip.",
};

export default async function TermsPage() {
  const { brand } = await getContent();

  return (
    <div className="bg-sand">
      <section className="container-editorial pt-16 md:pt-24">
        <p className="text-xs uppercase tracking-widest2 text-clay">Legal</p>
        <h1 className="mt-3 font-archivo uppercase text-3xl md:text-5xl text-ink">Terms of Use</h1>
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Last updated: [PLACEHOLDER — insert review date]. These terms apply to your use of this
          website, run by {brand.fullName}.
        </p>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-3xl space-y-8 text-sm md:text-base leading-relaxed text-ink/80">
          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">1. Using this website</h2>
            <p>
              By using this site you agree to these terms. Information on the site is provided for
              general travel planning and enquiry purposes. Anything you see here is an outline,
              not a confirmed booking — trip details, availability, and prices are always confirmed
              personally by our team before anything is booked.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">2. Enquiries</h2>
            <p>
              Sending an enquiry doesn&apos;t create a booking. It starts a conversation: our team
              will reply with a personal quotation and itinerary options. No payment is taken
              through this website.
            </p>
            <p className="mt-3">
              Please make sure the details you give us are accurate so we can plan properly.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">3. Content and intellectual property</h2>
            <p>
              The text, images, and design on this site belong to {brand.name} or its licensors and
              may not be copied, reused, or republished without permission beyond personal,
              non-commercial browsing.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">4. No warranties</h2>
            <p>
              This website is provided &ldquo;as is&rdquo;. While we work to keep it accurate and
              available, we don&apos;t warrant that it will always be error-free, uninterrupted, or
              free from harmful code.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">5. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {brand.name} won&apos;t be liable for any
              indirect or consequential loss arising from your use of this site. Nothing in these
              terms limits liability that can&apos;t be limited by law.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">6. Trips and bookings</h2>
            <p>
              Actual tours and travel services are provided under separate booking terms. We&apos;ll
              provide those with your quotation before any confirmed booking or deposit.
              [PLACEHOLDER — link or attach your booking terms, cancellation policy, and deposit
              rules here.]
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">7. Governing law and jurisdiction</h2>
            <p>
              [PLACEHOLDER — choose the governing law and jurisdiction, e.g. the laws of Zimbabwe
              and the courts of Victoria Falls, and record any dispute-resolution process required
              in your market.]
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">8. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}