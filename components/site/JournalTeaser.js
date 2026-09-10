import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { journal } from "@/data/journal";

export default function JournalTeaser() {
  const posts = journal.posts.slice(0, 3);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <HomeSectionIntro
            kicker="Muto Journal"
            title="Field notes from the road"
            dek={journal.intro}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <article className="group h-full rounded-2xl border border-charcoal/10 bg-white p-8 flex flex-col transition-colors hover:border-bronze/50">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow text-bronze">{post.category}</p>
                  <span className="rounded-full bg-sage/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sage">
                    Planned
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl text-charcoal leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65 flex-1">
                  {post.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink/50">
          Full articles are on the way. Want a topic covered first?{" "}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-semibold text-safari hover:underline"
          >
            Tell us
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}