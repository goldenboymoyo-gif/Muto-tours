import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import MediaFrame from "@/components/MediaFrame";
import { getContent } from "@/lib/content";
import { safeUrl } from "@/lib/safeUrl";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Plan a trip with Muto Tours — reach us by WhatsApp, phone, email, or the enquiry form below.",
  image: "/images/namibia.jpg",
});

export default async function ContactPage() {
  const { brand, media } = await getContent();
  const phoneHref = safeUrl(brand.contact.phoneHref);
  const mailtoHref = safeUrl(`mailto:${brand.contact.email}`);

  const faq = [
    {
      q: "Which countries does Muto Tours cover?",
      a: "We run guided tours across Zimbabwe, Botswana, Namibia, and South Africa — from Victoria Falls and the Zambezi to Hwange, Chobe, the Okavango Delta, Namibia's dunes, and Kruger.",
    },
    {
      q: "Can you build a custom itinerary around us?",
      a: "Yes. Custom multi-day itineraries are the core of what we do — priced and paced around your dates, budget, comfort level, and interests, whether you want lodges, mid-range stays, or authentic camping.",
    },
    {
      q: "Where is Muto Tours based?",
      a: "We're based in Victoria Falls, Zimbabwe, a short walk from the falls. Our guides work across the region daily, so local knowledge is baked into every route.",
    },
    {
      q: "Which activities can you arrange?",
      a: "Guided Victoria Falls walking tours, Zambezi sunset cruises, boma cultural dinners, Okavango mokoro excursions, Sossusvlei and Namib desert adventures, and guided game drives in Hwange, Chobe, and Etosha.",
    },
    {
      q: "How do I request a quote?",
      a: "Send an enquiry through this page, WhatsApp us at +263 77 784 9430, call +263 715 127 562, or email mutotours.travel@gmail.com. We reply within one business day.",
    },
    {
      q: "Do you handle transfers and border crossings?",
      a: "Yes — airport transfers and cross-border logistics are handled end to end on longer routes, including multi-country circuits across Zimbabwe, Botswana, Namibia, and South Africa.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PageHero
        src={media?.pageHero?.contact || "/images/namibia.jpg"}
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
                {phoneHref ? (
                  <a href={phoneHref} className="text-ink hover:text-clay transition-colors">
                    {brand.contact.phone}
                  </a>
                ) : (
                  <p className="text-ink">{brand.contact.phone}</p>
                )}
              </div>
              <div>
                <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">WhatsApp</p>
                <WhatsAppButton label={brand.contact.whatsapp} className="!text-ink hover:!text-clay" />
              </div>
              <div>
                <p className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Email</p>
                {mailtoHref ? (
                  <a href={mailtoHref} className="text-ink hover:text-clay transition-colors">
                    {brand.contact.email}
                  </a>
                ) : (
                  <p className="text-ink">{brand.contact.email}</p>
                )}
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
                src={media?.pageHero?.contactSide || "/images/hwange.jpg"}
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

      <section className="bg-ivory">
        <div className="container-editorial py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-archivo uppercase text-3xl sm:text-4xl text-ink mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-ink/60 max-w-lg mx-auto leading-relaxed">
              The questions we hear most often before a trip.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-ink/10 bg-white shadow-sm open:bg-sand transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4">
                  <span className="font-archivo uppercase tracking-wide text-sm text-ink leading-snug">
                    {item.q}
                  </span>
                  <span className="text-gold text-xl font-archivo leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-ink/70 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
