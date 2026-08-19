import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

const BASE_URL = "https://mutotours.africa";

export default function sitemap() {
  const staticRoutes = ["", "/destinations", "/experiences", "/gallery", "/about", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const experienceRoutes = experiences.map((e) => ({
    url: `${BASE_URL}/experiences/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes, ...experienceRoutes];
}
