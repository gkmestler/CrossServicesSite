import { site } from "@/content/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Town names as real text — this is what local search actually reads. */
export function ServiceAreaBlock() {
  return (
    <Section tone="paper" labelledBy="service-area-heading">
      <Reveal>
        <SectionHeader
          id="service-area-heading"
          eyebrow="Service area"
          title={`Where we work in ${site.serviceAreaLabel}`}
          lead="Based at 19 Tech Cir in Natick, and out on the road across the towns below every day. Not sure if you are in range? Call and ask."
        />
        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
          {site.serviceAreaTowns.map((town) => (
            <li
              key={town}
              className="rounded-[2px] border border-line bg-surface px-4 py-2 text-[16px]"
            >
              {town}, MA
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] text-muted">
          Residential cleaning on Cape Cod is handled by our sister company, The Furies.
        </p>
      </Reveal>
    </Section>
  );
}
