import Link from "next/link";
import { brand } from "@/data/brand";
import { destinations } from "@/data/destinations";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-river text-ivory">
      <div className="container-editorial py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-5 text-sm text-ivory/70 leading-relaxed max-w-xs">
            {brand.shortStatement}
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest2 text-gold">
            {brand.founded}
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">
            Destinations
          </h3>
          <ul className="space-y-3">
            {destinations.slice(0, 5).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="text-sm text-ivory/80 hover:text-gold transition-colors"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">
            Company
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">
            Get in touch
          </h3>
          <ul className="space-y-3 text-sm text-ivory/80">
            <li>
              <a href={brand.contact.phoneHref} className="hover:text-gold transition-colors">
                {brand.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.contact.email}`} className="hover:text-gold transition-colors">
                {brand.contact.email}
              </a>
            </li>
            <li className="text-ivory/60 leading-relaxed pt-1">
              {brand.contact.address.line1}
              <br />
              {brand.contact.address.line2}
              <br />
              {brand.contact.address.line3}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-editorial py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>&copy; {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Instagram
            </a>
            <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
