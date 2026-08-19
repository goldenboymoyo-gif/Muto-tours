const testimonials = [
  {
    name: "Sarah M.",
    location: "United Kingdom",
    text: "Muto Tours handled all my tours for my stay in Victoria Falls. Not only were they very communicative prior to our arrival, but they were great to deal with on-site — both their representative as well as their tour guides and drivers for every activity we planned. I would let Muto Tours handle things as they are very good at what they do. I have no complaints whatsoever and only compliments!",
    rating: 5,
  },
  {
    name: "James K.",
    location: "Australia",
    text: "Thank you Muto Tours for a fabulous day trip to Chobe. From the start right to the end we were looked after. Everything ran smoothly, the pick-up, the border crossing, the ferry across the river into Botswana. Our guide was a good driver. Lunch was great and the afternoon cruise along the Chobe River was superb! And we all arrived safely back.",
    rating: 5,
  },
  {
    name: "Maria L.",
    location: "Germany",
    text: "Muto Tours went above and beyond our expectations. They were always on time to pick us up, staff were friendly, their tours and airport transfers well organised. They were our tour operators for Chobe National Park, Victoria Falls, Zambezi sunset cruise and our airport transfers. The transport was always clean, drivers friendly.",
    rating: 5,
  },
  {
    name: "David W.",
    location: "United States",
    text: "We used Muto Tours for a walking tour of the falls and a sunset cruise. Our guide was absolutely amazing, very friendly and so knowledgeable. The sunset cruise was beautiful and one of the highlights of our entire trip here in Africa. We saw many animals and the staff on the cruise was also wonderful. We highly recommend using this company.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
