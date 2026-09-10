"use client";

import MediaFrame from "@/components/MediaFrame";
import Button from "@/components/Button";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function PlanJourneyCTA() {
  const { content } = useSiteContent();
  const img = content.media?.homepage?.ctaBand || "/images/slide2.jpg";

  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <MediaFrame src={img} alt="" sizes="100vw" className="absolute inset-0" />
        <div
          className="absolute inset-0 bg-charcoal/80"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,20,18,0.94) 0%, rgba(16,20,18,0.72) 55%, rgba(16,20,18,0.45) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 container-content py-24 md:py-32">
        <p className="eyebrow text-bronze mb-5 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-bronze" aria-hidden="true" />
          Plan Your Journey
        </p>
        <h2 className="font-display text-white text-4xl sm:text-5xl md:text-6xl leading-[1.02] max-w-3xl text-balance">
          Let's map your route to Southern Africa.
        </h2>
        <p className="mt-6 max-w-xl text-white/75 text-base md:text-lg leading-relaxed">
          Tell us where you're dreaming of going, when and with who. We'll come
          back with a route shaped around you.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="primary">
            Plan My Journey
          </Button>
          <Button
            href={content.brand?.contact?.whatsappHref}
            variant="ghost"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}