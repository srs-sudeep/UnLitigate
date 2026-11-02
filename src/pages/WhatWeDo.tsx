import whatWeDo from "../data/whatWeDo.json";
import { IndiaMap } from "../components/illustrations/IndiaMap";
import { Seo } from "../components/layout/Seo";
import { CtaBand } from "../components/ui/CtaBand";
import { PageHero } from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";
import { StatusCard } from "../components/ui/StatusCard";
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
        <div className="grid gap-4 md:grid-cols-3">
          {whatWeDo.parts.items.map((item) => (
            <StatusCard
              key={item.heading}
              status={item.status}
              heading={item.heading}
              body={item.body}
            />
          ))}
        </div>
      </Section>

      <Section className="pb-16">
        <IndiaMap
          heading={whatWeDo.map.heading}
          body={whatWeDo.map.body}
          caption={whatWeDo.map.caption}
          pins={whatWeDo.map.pins}
          reducedMotion={reduced}
        />
      </Section>

      <Section id="safeguards" tone="mist" className="py-16 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">
          {whatWeDo.safeguards.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink/70">
          {whatWeDo.safeguards.subheading}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {whatWeDo.safeguards.items.map((item) => (
            <article
              key={item.heading}
              className="lift rounded-3xl border border-ink/8 bg-cream p-6"
            >
              <h3 className="font-serif text-2xl">{item.heading}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">{whatWeDo.whyNow.heading}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/75">
          {whatWeDo.whyNow.body}
        </p>
      </Section>

      <CtaBand
        heading={whatWeDo.cta.heading}
        body={whatWeDo.cta.body}
        button={whatWeDo.cta.button}
      />
    </>
  );
}
