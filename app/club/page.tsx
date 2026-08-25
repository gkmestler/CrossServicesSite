import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { imageExists } from "@/lib/images";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/Checkbox";
import { MediaFrame } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Cross Courts — squash and fitness in Natick",
  description:
    "Four international squash courts, one of the largest junior academies in the country, adult leagues, a fitness center and the Garage Gym. At 19 Tech Cir, Natick.",
  path: "/club",
});

const HERO_IMAGE = "/images/club/courts-hero-2.jpg";

const SQUASH = [
  "Four international squash courts",
  "Four squash professionals on staff",
  "Junior Academy — one of the largest in the country, with nationally ranked players",
  "MSRA league play for adults",
  "In-house box league",
  "Recreational court time for members",
];

const FITNESS = [
  "State-of-the-art fitness center",
  "The Garage Gym",
  "Warm-up and stretching room",
  "Lounge with complimentary wifi",
  "Locker rooms with a steam room",
  "Massage and chiropractic through our health and wellness program",
];

const MEMBERSHIP_GROUPS = [
  {
    label: "Squash",
    tiers: ["Single Membership", "Family Membership", "Junior Membership"],
  },
  {
    label: "Fitness Center",
    tiers: ["Garage Gym - Individual", "Garage Gym - Family", "Garage Gym - Student"],
  },
];

export default function ClubPage() {
  const hasHero = imageExists(HERO_IMAGE);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative isolate overflow-hidden bg-cross-navy">
        {hasHero ? (
          <>
            <Image
              src={HERO_IMAGE}
              alt="A squash court at Cross Courts in Natick"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-cross-navy/72" />
          </>
        ) : null}

        <Container className="relative py-16 md:py-24 lg:py-28">
          <p className="font-display font-semibold mb-6 text-white/70">Cross Courts · Natick</p>
          <h1 className="max-w-[18ch] text-[34px] leading-[1.05] text-white md:text-[52px] lg:text-[60px]">
            One of the premier squash clubs in the northeast
          </h1>
          <p className="mt-5 max-w-[52ch] text-[18px] text-white/85 md:text-[20px]">
            Four international courts, a junior academy with nationally ranked players,
            adult leagues, and a fitness center that members can use any time they are in
            the building.
          </p>
          {/* Matched pair, same as the homepage hero. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={site.courtReserveUrl}
              external
              size="lg"
              variant="outline-on-dark"
            >
              Join or book a court
            </ButtonLink>
            <ButtonLink href={site.phone.href} size="lg" variant="outline-on-dark">
              <Phone aria-hidden="true" className="size-4.5" />
              {site.phone.display}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- squash */}
      <Section tone="paper" labelledBy="squash-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader
              id="squash-heading"
              eyebrow="Squash"
              eyebrowClassName="font-display! text-[15px]! font-semibold! normal-case! tracking-normal!"
              title="Courts, coaching and competition"
              lead="Our Junior Academy program is one of the largest in the country, with many nationally ranked players, some of whom rank in the Junior Top 10. The adult program is vibrant, with MSRA league play and in-house box league matches — and recreational play."
            />
            <div className="mt-8">
              <CheckList items={SQUASH} />
            </div>
            <p className="mt-5 text-[16px] font-semibold text-muted">
              To sign up for clinics or schedule lessons, email{" "}
              <a
                href="mailto:info@crosscourtsquash.com"
                className="text-cross-blue underline-offset-4 hover:underline"
              >
                info@crosscourtsquash.com
              </a>
            </p>
          </Reveal>
          <Reveal delayIndex={1}>
            <MediaFrame
              src="/images/club/squash-3.jpg"
              alt="A squash court at Cross Courts"
              ratio="4/3"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- fitness */}
      <Section tone="surface" labelledBy="fitness-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delayIndex={1} className="lg:order-2">
            <SectionHeader
              id="fitness-heading"
              eyebrow="Fitness"
              eyebrowClassName="font-display! text-[15px]! font-semibold! normal-case! tracking-normal!"
              title="The fitness center and the Garage Gym"
              lead="Cross Court members take advantage of our state-of-the-art fitness center and our Garage Gym, plus a warm-up and stretching room, a lounge with complimentary wifi, and locker rooms with a steam room."
            />
            <div className="mt-8">
              <CheckList items={FITNESS} />
            </div>
          </Reveal>
          <Reveal className="lg:order-1">
            <MediaFrame
              src="/images/club/garage-gym-2.jpg"
              alt="The Garage Gym at Cross Courts in Natick"
              ratio="4/3"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href="https://app.courtreserve.com/Online/Memberships/Public/13265"
                external
                size="lg"
                variant="primary"
              >
                Join the gym
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------- hours and location */}
      <Section tone="paper" labelledBy="club-visit-heading">
        <SectionHeader
          id="club-visit-heading"
          eyebrow="Visit"
          eyebrowClassName="font-display! text-[15px]! font-semibold! normal-case! tracking-normal!"
          title="Hours and location"
        />
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="rounded-[3px] border border-line bg-surface p-6 md:p-8">
              <h3 className="text-[19px]">Club hours</h3>
              {site.clubHoursArePlaceholder ? (
                <p className="mt-3 rounded-[2px] border border-dashed border-line bg-paper p-4 text-[15px] text-muted">
                  <span className="type-eyebrow block text-muted">Draft — to confirm</span>
                  <span className="mt-2 block">
                    Club and court hours have not been supplied yet. Send them over and
                    they will appear here, in the footer and in the Google listing data.
                    In the meantime, opening times are on the booking portal.
                  </span>
                </p>
              ) : (
                <dl className="mt-4 flex flex-col gap-2 text-[16px]">
                  {site.clubHours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-muted">{h.days}</dt>
                      <dd>{h.display}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <h3 className="mt-8 text-[19px]">Membership</h3>
              <div className="mt-4 flex flex-col gap-5">
                {MEMBERSHIP_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="type-eyebrow text-muted">{group.label}</p>
                    <ul className="mt-2 flex flex-col gap-2 text-[16px]">
                      {group.tiers.map((tier) => (
                        <li key={tier}>{tier}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[15px] text-muted">
                Pricing is shown in the booking portal.
              </p>

              <div className="mt-6">
                <ButtonLink
                  href="https://app.courtreserve.com/Online/Memberships/Public/13265"
                  external
                  className="w-full sm:w-auto"
                >
                  See membership options
                </ButtonLink>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-5 flex items-start gap-3 text-[17px]">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-cross-blue" />
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-cross-blue hover:underline"
              >
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                {site.address.zip}
              </a>
            </p>
            <MediaFrame
              src="/images/club/crosscourts-3.jpg"
              alt="Cross Courts in Natick"
              ratio="3/2"
              sizes="(min-width: 768px) 520px, 90vw"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
