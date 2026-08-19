const testimonials = [
  {
    name: "Sarah M.",
    location: "United Kingdom",
    text: "Muto Tours handled every detail of our Victoria Falls and Chobe trip. The guides were knowledgeable, the transfers seamless, and the sunset cruise on the Zambezi was the highlight of our entire Africa trip. Highly recommend.",
    rating: 5,
  },
  {
    name: "James K.",
    location: "Australia",
    text: "We booked a 10-day Namibia Explorer route and it exceeded every expectation. The dunes at Sossusvlei, the coast at Swakopmund, and Etosha's waterholes — every day was a new adventure. The team at Muto Tours made it effortless.",
    rating: 5,
  },
  {
    name: "Maria L.",
    location: "Germany",
    text: "From the first email to the last drop-off at the airport, everything was professional and personal. Our guide knew every corner of Hwange and found us elephants, wild dogs, and a leopard in three days. Outstanding.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">What Our Clients Say</h2>
          <p className="text-sm text-ink/60">Real experiences from real travellers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-ink/10 p-7 rounded-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-ink/75 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-ink">{t.name}</p>
                <p className="text-xs text-ink/50">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
