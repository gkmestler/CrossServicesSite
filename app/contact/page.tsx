import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/blocks/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: `Contact — ${site.address.city}, ${site.address.state}`,
  description: `Call ${site.phone.display}, email ${site.email}, or visit us at ${site.address.full}. Cross Services Group serves MetroWest Boston.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* --------------------------------------------------- details */}
          <div>
            <h2 className="text-[26px] leading-[1.15] md:text-[34px]">Get in touch</h2>

            <ul className="mt-8 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="font-display text-[15px] font-semibold text-cross-blue">Phone</p>
                  <a
                    href={site.phone.href}
                    className="mt-1 inline-block text-[19px] font-medium text-cross-blue underline-offset-4 hover:underline"
                  >
                    {site.phone.display}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-cross-blue">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block break-all text-[17px] text-cross-blue underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="font-display text-[15px] font-semibold text-cross-blue">Address</p>
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[17px] underline-offset-4 hover:text-cross-blue hover:underline"
                  >
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
                <div>
                  <p className="font-display text-[15px] font-semibold text-cross-blue">Hours</p>
                  <dl className="mt-2 flex flex-col gap-1 text-[17px]">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex gap-3">
                        <dt className="w-[10.5rem] shrink-0 text-muted">{h.days}</dt>
                        <dd>{h.display}</dd>
                      </div>
                    ))}
                  </dl>
                  {site.hoursArePlaceholder ? (
                    <p className="mt-3 rounded-[2px] border border-dashed border-line bg-surface p-3 text-[14px] text-muted">
                      <span className="type-eyebrow block text-muted">
                        Draft — to confirm
                      </span>
                      <span className="mt-1.5 block">
                        These are placeholder hours. Send the real ones and they update
                        here, on the club page and in the Google listing data.
                      </span>
                    </p>
                  ) : null}
                </div>
              </li>
            </ul>
          </div>

          {/* ------------------------------------------------------ form */}
          <div>
            <SectionHeader
              eyebrow="General inquiry"
              title="Send us a message"
              lead="For anything that is not a quote request — an existing job, an invoice, a question about whether we cover your town."
              eyebrowClassName="font-display! text-[19px]! font-semibold! normal-case! tracking-normal! text-cross-blue!"
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
