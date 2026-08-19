import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import MediaFrame from "@/components/MediaFrame";
import BackLink from "@/components/BackLink";
import { brand } from "@/data/brand";

export const metadata = {
  title: "Contact",
  description: "Plan a trip with Muto Tours — reach us by WhatsApp, phone, email, or the enquiry form below.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 bg-sand">
      <div className="container-editorial pb-20 md:pb-28 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <BackLink fallbackHref="/" fallbackLabel="Home" className="text-clay hover:text-clay-dark mb-6" />
          <p className="text-xs uppercase tracking-widest2 text-clay mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink text-balance">
            Let&rsquo;s plan your route.
          </h1>
          <p className="mt-6 text-base text-ink/70 leading-relaxed max-w-md">
            Fill in as much or as little as you know so far — dates, a rough budget, the
            destinations pulling at you. We reply personally, usually within a day.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div>
              <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Phone</p>
              <a href={brand.contact.phoneHref} className="text-ink hover:text-clay transition-colors">
                {brand.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">WhatsApp</p>
              <WhatsAppButton label={brand.contact.whatsapp} className="!text-ink hover:!text-clay" />
            </div>
            <div>
              <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Email</p>
              <a href={`mailto:${brand.contact.email}`} className="text-ink hover:text-clay transition-colors">
                {brand.contact.email}
              </a>
            </div>
            <div>
              <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Based in</p>
              <p className="text-ink/80 leading-relaxed">
                {brand.contact.address.line1}
                <br />
                {brand.contact.address.line2}
                <br />
                {brand.contact.address.line3}
              </p>
            </div>
          </div>

          <div className="relative mt-10 aspect-[4/3] hidden lg:block">
            <MediaFrame
              src="/images/etosha-safari-track.jpg"
              alt="Safari vehicles on a game-viewing track"
              label="On the road"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-14">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
