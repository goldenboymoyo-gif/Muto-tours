import Link from "next/link";
import MediaFrame from "./MediaFrame";

const posts = [
  {
    title: "Best Time to Visit Victoria Falls",
    excerpt: "Understanding spray levels, water flow, and the ideal months for your visit to Mosi-oa-Tunya.",
    image: "/images/victoria-falls-mist.jpg",
    imageAlt: "Victoria Falls mist rising",
    date: "2025",
  },
  {
    title: "Chobe National Park: A Day Trip Guide",
    excerpt: "Everything you need to know about crossing from Victoria Falls into Botswana for a Chobe safari day.",
    image: "/images/river-cruise-boat.jpg",
    imageAlt: "Chobe River cruise",
    date: "2025",
  },
  {
    title: "Okavango Delta: Mokoro vs Motorboat",
    excerpt: "Two ways to explore the Delta — which one suits your travel style and what to expect from each.",
    image: "/images/okavango-mokoro-sunset.jpg",
    imageAlt: "Mokoro on the Okavango Delta",
    date: "2025",
  },
];

export default function LatestNews() {
  return (
    <section className="bg-sand">
      <div className="container-editorial py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-clay mb-3">Travel Updates</p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink">Latest News</h2>
          </div>
          <Link
            href="/about"
            className="text-sm text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors"
          >
            All news
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="group">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
                <MediaFrame
                  src={post.image}
                  alt={post.imageAlt}
                  label={post.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="text-xs text-ink/50 mb-2">{post.date}</p>
              <h3 className="font-display text-lg text-ink group-hover:text-clay transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
