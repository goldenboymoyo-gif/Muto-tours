import { MapPin, Compass, Route, MessagesSquare } from "lucide-react";

const ITEMS = [
  {
    icon: MapPin,
    title: "Victoria Falls Based",
    text: "A team that lives a short walk from the falls.",
  },
  {
    icon: Compass,
    title: "Local Expertise",
    text: "Real knowledge of the roads, rivers and parks.",
  },
  {
    icon: Route,
    title: "Tailor-Made Journeys",
    text: "Routes designed around you, not a template.",
  },
  {
    icon: MessagesSquare,
    title: "Personal Support",
    text: "Real people before, during and after your trip.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-safari text-ivory" aria-label="What makes Muto Tours different">
      <div className="container-content py-10 md:py-12">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {ITEMS.map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bronze/50 text-bronze">
                <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <p className="font-ui text-sm font-bold tracking-wide">{item.title}</p>
                <p className="mt-1 text-[13px] text-ivory/65 leading-snug">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}