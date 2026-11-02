import whatWeDo from "../data/whatWeDo.json";
import { IndiaMap } from "../components/illustrations/IndiaMap";
import { Seo } from "../components/layout/Seo";
import { CtaBand } from "../components/ui/CtaBand";
import { PageHero } from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";
import { StatusTrack } from "../components/ui/StatusTrack";
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
        <StatusTrack items={whatWeDo.parts.items} />
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

      <Section id="safeguards" tone="mist" className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">
              {whatWeDo.safeguards.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
              {whatWeDo.safeguards.subheading}
            </p>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {whatWeDo.safeguards.items
                .filter((item) => item.kind === "take" || item.kind === "leave")
                .map((item) => (
                  <article
                    key={item.heading}
                    className={`rounded-3xl p-6 sm:p-7 ${
                      item.kind === "take"
                        ? "bg-teal text-cream"
                        : "border border-ink/10 bg-cream"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        item.kind === "take" ? "text-cream/70" : "text-clay"
                      }`}
                    >
                      {item.heading}
                    </p>
                    <p
                      className={`mt-3 leading-relaxed ${
                        item.kind === "take" ? "text-cream/90" : "text-ink/75"
                      }`}
                    >
                      {item.body}
                    </p>
                  </article>
                ))}
            </div>
            <ul className="mt-2 divide-y divide-ink/10">
              {whatWeDo.safeguards.items
                .filter((item) => item.kind === "rule")
                .map((item) => (
                  <li key={item.heading} className="py-5 first:pt-6">
                    <h3 className="font-serif text-xl text-ink">{item.heading}</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">{item.body}</p>
                  </li>
                ))}
            </ul>
          </div>
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
