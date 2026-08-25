import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cross Courts sits low on the homepage and stays visually separate — it is
 * a different audience entirely, and it should not compete with the services.
 */
export function ClubBand() {
  return (
    <section aria-labelledby="club-band-heading" className="border-y border-line bg-surface">
      <Container className="py-12 md:py-16">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[52ch]">
            <p className="type-eyebrow mb-3 text-cross-blue">Cross Courts</p>
            <h2 id="club-band-heading" className="text-[26px] leading-[1.15] md:text-[32px]">
              Squash and fitness in Natick
            </h2>
            <p className="mt-3 text-[16px] text-muted">
              Four international squash courts, a junior academy, adult leagues, a fitness
              center and the Garage Gym — all at 19 Tech Cir.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/club" variant="secondary">
              About the club
            </ButtonLink>
            <ButtonLink href={site.courtReserveUrl} external>
              Join or book a court
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
