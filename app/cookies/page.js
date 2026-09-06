import { getContent } from "@/lib/content";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies the Muto Tours website sets and how you can control your cookie preferences.",
};

export default async function CookiePage() {
  const { brand } = await getContent();

  return (
    <div className="bg-sand">
      <section className="container-editorial pt-16 md:pt-24">
        <p className="text-xs uppercase tracking-widest2 text-clay">Legal</p>
        <h1 className="mt-3 font-archivo uppercase text-3xl md:text-5xl text-ink">Cookie Policy</h1>
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Cookies are small text files stored on your device. This page explains the ones this
          site uses and how you can control them.
        </p>
      </section>

      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-3xl space-y-8 text-sm md:text-base leading-relaxed text-ink/80">
          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Cookies this site sets</h2>
            <p>
              At the moment the site only sets a tiny, well-defined set of cookies:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-clay/20 text-xs uppercase tracking-widest2 text-ink/50">
                    <th className="py-3 pr-4 font-normal">Cookie</th>
                    <th className="py-3 pr-4 font-normal">Purpose</th>
                    <th className="py-3 pr-4 font-normal">Category</th>
                    <th className="py-3 font-normal">Lifetime</th>
                  </tr>
                </thead>
                <tbody className="text-ink/80">
                  <tr className="border-b border-clay/10">
                    <td className="py-3 pr-4 whitespace-nowrap">muto_cc</td>
                    <td className="py-3 pr-4">Remembers your cookie preference choice.</td>
                    <td className="py-3 pr-4">Necessary</td>
                    <td className="py-3 whitespace-nowrap">1 year</td>
                  </tr>
                  <tr className="border-b border-clay/10">
                    <td className="py-3 pr-4 whitespace-nowrap">muto_admin_session</td>
                    <td className="py-3 pr-4">
                      Keeps the site administrator signed in to the private admin area. Set only on
                      admin login and never readable by JavaScript.
                    </td>
                    <td className="py-3 pr-4">Necessary (admin only)</td>
                    <td className="py-3 whitespace-nowrap">7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We don&apos;t currently set any functional, analytics, or advertising cookies. The
              consent banner&apos;s categories exist so that any optional cookies added in future
              are only loaded with your permission.
            </p>
            <p>
              [PLACEHOLDER — if you add an analytics or marketing service later, list it here with
              links to its own cookie/privacy documentation.]
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">How to control cookies</h2>
            <p>
              When you first visit the site you&apos;ll see a banner offering{" "}
              <strong>Accept all</strong>, <strong>Reject non-essential</strong>, or the option to{" "}
              <strong>Manage preferences</strong>. You can revisit these choices at any time from
              the &ldquo;Cookie Preferences&rdquo; link in the footer.
            </p>
            <p className="mt-3">
              You can also clear or block cookies in your browser settings, but blocking the
              necessary cookies may affect how the site works for you.
            </p>
          </section>

          <section>
            <h2 className="font-archivo uppercase text-lg text-ink mb-3">Questions</h2>
            <p>
              Contact us at{" "}
              <a href={`mailto:${brand.contact.email}`} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>{" "}
              if you have any questions about cookies on this site.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}