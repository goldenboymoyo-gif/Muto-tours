import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { faqs } from "@/data/faq";

export default function HomeFAQ() {
  const items = faqs.slice(0, 4);

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-content">
        <HomeSectionIntro
          kicker="Good to Know"
          title="Answers before you ask"
          dek="A few of the questions we hear most often. More on the contact page."
        />

        <div className="mt-12 max-w-3xl space-y-3">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group rounded-xl border border-charcoal/10 bg-white open:bg-white transition-colors">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                  <span className="font-display text-lg text-charcoal leading-snug">
                    {item.q}
                  </span>
                  <span
                    className="text-bronze text-xl font-display leading-none group-open:rotate-45 transition-transform shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm text-ink/70 leading-relaxed">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/contact#faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-safari hover:gap-3 transition-all"
          >
            See all FAQs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}