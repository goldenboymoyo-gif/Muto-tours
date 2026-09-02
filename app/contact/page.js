import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import MediaFrame from "@/components/MediaFrame";
import { brand } from "@/data/brand";

export const metadata = {
  title: "Contact",
  description: "Plan a trip with Muto Tours — reach us by WhatsApp, phone, email, or the enquiry form below.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        src="/images/namibia.jpg"
        alt="A natural rock arch in the Namibian desert"
        kicker="Get in Touch"
        title="Let's plan your route."
        subtitle="Fill in as much or as little as you know so far — dates, a rough budget, the destinations pulling at you."
        height="h-[45vh] min-h-[340px]"
      />

      <section className="bg-sand">
        <div className="container-editorial py-20 md:py-28 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest2 text-clay mb-4">Contact Details</p>
            <div className="space-y-5 text-sm">
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
                src="/images/hwange.jpg"
                alt="A safari vehicle under an acacia tree"
                label="On the road"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-14">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
