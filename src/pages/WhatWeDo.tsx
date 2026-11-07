import whatWeDo from "../data/whatWeDo.json";
import { IndiaMap } from "../components/illustrations/IndiaMap";
import { Seo } from "../components/layout/Seo";
import { CaseFlow } from "../components/ui/CaseFlow";
import { CtaBand } from "../components/ui/CtaBand";
import { PageHero } from "../components/ui/PageHero";
import { PartsScrollStory } from "../components/ui/PartsScrollStory";
import { Reveal } from "../components/ui/Reveal";
import { SafeguardsPanel } from "../components/ui/SafeguardsPanel";
import { Section } from "../components/ui/Section";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function WhatWeDo() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo title={whatWeDo.meta.title} description={whatWeDo.meta.description} />
      <Section>
        <PageHero
          eyebrow={whatWeDo.hero.eyebrow}
          heading={whatWeDo.hero.heading}
          body={whatWeDo.hero.body}
        />
      </Section>

      <Section className="pb-16">
        <PartsScrollStory items={whatWeDo.parts.items} />
      </Section>

      <Section tone="mist" className="py-16 sm:py-24">
        <CaseFlow
          heading={whatWeDo.flow.heading}
          subheading={whatWeDo.flow.subheading}
          items={whatWeDo.flow.items}
        />
      </Section>

      <Section tone="teal" className="py-16 sm:py-24">
        <IndiaMap
          eyebrow={whatWeDo.map.eyebrow}
          heading={whatWeDo.map.heading}
          body={whatWeDo.map.body}
          caption={whatWeDo.map.caption}
          hint={whatWeDo.map.hint}
          pins={whatWeDo.map.pins}
          reducedMotion={reduced}
        />
      </Section>

      <Section tone="mist" className="py-16 sm:py-24">
        <SafeguardsPanel
          heading={whatWeDo.safeguards.heading}
          subheading={whatWeDo.safeguards.subheading}
          cards={whatWeDo.safeguards.cards}
          take={whatWeDo.safeguards.take}
          leave={whatWeDo.safeguards.leave}
        />
      </Section>

      <Section className="py-16">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">{whatWeDo.whyNow.heading}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/75">
            {whatWeDo.whyNow.body}
          </p>
        </Reveal>
      </Section>

      <CtaBand
        heading={whatWeDo.cta.heading}
        body={whatWeDo.cta.body}
        button={whatWeDo.cta.button}
      />
    </>
  );
}
