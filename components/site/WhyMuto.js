import { MapPinned, PenLine, Leaf, MessagesSquare } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";

const PILLARS = [
  {
    icon: MapPinned,
    title: "Local Knowledge",
    text: "We know the roads, rivers, parks and places that make Southern Africa unforgettable.",
  },
  {
    icon: PenLine,
    title: "Personally Designed",
    text: "Trips are tailored around you — your dates, pace, budget and idea of the perfect day.",
  },
  {
    icon: Leaf,
    title: "Thoughtful Travel",
    text: "Meaningful experiences that respect the destinations and communities they take you into.",
  },
  {
    icon: MessagesSquare,
    title: "Personal Support",
    text: "Real people before and during your journey, ready when you need them.",
  },
];

export default function WhyMuto() {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-content">
        <HomeSectionIntro
          align="center"
          kicker="Why Muto"
          title="Why travel with Muto?"
          dek="A Zimbabwe-based team with deep local roots and the ability to move you across Southern Africa."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-charcoal/10 bg-white p-8 transition-colors hover:border-bronze/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-safari/10 text-safari">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl text-charcoal">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}