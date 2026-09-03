import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { services, getService } from "@/content/services";
import { site } from "@/content/site";
import { imageExists } from "@/lib/images";
import {
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";
import { Container } from "@/components/ui/Section";
import { CheckList } from "@/components/ui/Checkbox";
import { BothAudiencesTag } from "@/components/ui/Tag";
import { MediaFrame } from "@/components/ui/Media";
import { BeforeAfter } from "@/components/blocks/BeforeAfter";
import { Gallery } from "@/components/blocks/Gallery";
import { Faq } from "@/components/blocks/Faq";
import { QuoteSidebar } from "@/components/blocks/QuoteSidebar";
import { QuoteCta } from "@/components/blocks/QuoteCta";

export function generateStaticParams() {
  return services
    .filter((service) => !service.externalUrl && !service.quoteOnly)
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  /* Titles carry the town as well as the service — "Window Washing in
     Natick, MA" — because that is how people search for a local trade. The
     root layout appends "| Cross Services Group". */
  return pageMetadata({
    title: `${service.name} in ${site.address.city}, ${site.address.state}`,
    description: `${service.tagline} ${service.name} for homes and commercial properties across ${site.serviceAreaLabel}, from Cross Services Group.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.quoteOnly) notFound();
  if (service.externalUrl) redirect(service.externalUrl);

  /* The before/after slider only appears when both photos actually exist. */
  const ba = service.beforeAfter;
  const showBeforeAfter =
    Boolean(ba) && imageExists(ba!.before) && imageExists(ba!.after);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      <Container className="pt-8 pb-2 md:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[15px] text-muted">
            <li>
              <Link href="/" className="underline-offset-4 hover:text-cross-blue hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/services"
                className="underline-offset-4 hover:text-cross-blue hover:underline"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {service.name}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-16">
          <div className="min-w-0">
            {/* ------------------------------------------------ heading */}
            <div className="mb-3">
              <BothAudiencesTag label={service.audienceLabel} />
            </div>
            <h1 className="text-[34px] leading-[1.05] md:text-[48px]">{service.name}</h1>
            <p className="mt-4 max-w-[52ch] text-[19px] text-muted md:text-[21px]">
              {service.tagline}
            </p>

            {/* -------------------------------------------------- visual */}
            <div className="mt-8">
              {showBeforeAfter ? (
                <BeforeAfter
                  before={ba!.before}
                  after={ba!.after}
                  alt={`${service.name} by Cross Services Group`}
                  caption={ba!.caption}
                />
              ) : (
                <MediaFrame
                  src={service.heroImage}
                  alt={`Cross Services Group ${service.name.toLowerCase()} work in ${site.serviceAreaLabel}`}
                  ratio="16/9"
                  sizes="(min-width: 1024px) 780px, 100vw"
                  priority
                  note={`${service.name} hero photo`}
                />
              )}
            </div>

            {/* ---------------------------------------------------- intro */}
            <p className="mt-10 max-w-[68ch] text-[18px]">{service.intro}</p>

            {/* -------------------------------------------- what's included */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-[26px] leading-[1.15] md:text-[34px]">
                What&apos;s included
              </h2>
              <div className={service.includesGroups ? "mt-6" : "mt-6 max-w-[68ch]"}>
                {service.includesGroups ? (
                  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    <div>
                      <p className="font-display mb-3 text-[18px] font-semibold text-cross-navy">
                        {service.includesGroups[0].heading}
                      </p>
                      <CheckList items={service.includesGroups[0].items} />
                    </div>
                    <div className="flex flex-col gap-8">
                      {service.includesGroups.slice(1).map((group) => (
                        <div key={group.heading}>
                          <p className="font-display mb-3 text-[18px] font-semibold text-cross-navy">
                            {group.heading}
                          </p>
                          <CheckList items={group.items} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {service.includesHeading ? (
                      <p className="font-display mb-3 text-[18px] font-semibold text-cross-navy">
                        {service.includesHeading}
                      </p>
                    ) : null}
                    <CheckList items={service.includes} />
                  </>
                )}
              </div>
            </div>

            {/* -------------------------------------------------- gallery */}
            <Gallery paths={service.gallery} serviceName={service.name} />

            {/* ------------------------------------------------------ FAQ */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-[26px] leading-[1.15] md:text-[34px]">
                Questions we get asked
              </h2>
              <div className="mt-6">
                <Faq faqs={service.faqs} />
              </div>
            </div>
          </div>

          <QuoteSidebar serviceSlug={service.slug} serviceName={service.name} />
        </div>
      </Container>

      <QuoteCta
        title={`Get a quote for ${service.name.toLowerCase()}`}
        body="We will pre-select this one for you. Add anything else you need on the same form."
        service={service.slug}
      />
    </>
  );
}
