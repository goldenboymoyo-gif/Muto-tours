import { brand } from "@/data/brand";
import WhatsAppButton from "./WhatsAppButton";
import Button from "./Button";

export default function CTABand({
  kicker = "Start Planning",
  title = "Tell us where you'd like to go.",
  dek = "Every Muto Tours itinerary is built from scratch around your dates, budget, and pace of travel. Send us a note and we'll reply with a route worth considering.",
}) {
  return (
    <section className="bg-clay">
      <div className="container-editorial py-20 md:py-24 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <p className="text-xs uppercase tracking-widest2 text-ivory/70 mb-4">{kicker}</p>
          <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-ivory leading-[1.1] text-balance">
            {title}
          </h2>
          <p className="mt-5 text-ivory/85 max-w-lg leading-relaxed">{dek}</p>
        </div>
        <div className="md:col-span-4 flex flex-col items-start md:items-end gap-4">
          <Button href="/contact" variant="inverse">{brand.primaryCta.label}</Button>
          <WhatsAppButton className="!text-ivory/90 hover:!text-ivory" />
        </div>
      </div>
    </section>
  );
}
