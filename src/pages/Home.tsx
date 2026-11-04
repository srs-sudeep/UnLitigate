import { Link } from "react-router-dom";
import { motion } from "motion/react";
import home from "../data/home.json";
import { BenchThread } from "../components/illustrations/BenchThread";
import { Doors } from "../components/illustrations/Doors";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { CtaBand } from "../components/ui/CtaBand";
import { PathsTable } from "../components/ui/PathsTable";
import { Section } from "../components/ui/Section";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SituationIcon } from "../components/ui/SituationIcon";
import { StatusTrack } from "../components/ui/StatusTrack";
import { StoryCards } from "../components/ui/StoryCards";
import { Reveal } from "../components/ui/Reveal";
import { TrustRibbon } from "../components/ui/TrustRibbon";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function Home() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo title={home.meta.title} description={home.meta.description} />

      <Section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="inline-flex rounded-full border border-teal/25 bg-mist/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.6rem]">
              {home.hero.heading}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
              {home.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={home.hero.primaryCta.href}>
                {home.hero.primaryCta.label}
              </Button>
              <Button href={home.hero.secondaryCta.href} variant="outline">
                {home.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <Doors
            court={home.hero.doors.court}
            mediation={home.hero.doors.mediation}
            caption={home.hero.doors.caption}
            reducedMotion={reduced}
          />
        </div>
      </Section>

      <Section tone="mist" className="py-16 sm:py-24">
        <Reveal>
          <SectionHeader
            kicker="Start here"
            heading={home.situations.heading}
            subheading={home.situations.subheading}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.situations.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link
                  to={item.href}
                  className="lift situation-card group block h-full rounded-3xl border border-ink/8 bg-cream p-5"
                >
                  <SituationIcon id={item.id} />
                  <h3 className="mt-4 font-serif text-xl text-ink">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {item.body}
                  </p>
                  <span className="situation-arrow mt-4 inline-block text-sm font-semibold text-teal">
                    Read more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="py-16 sm:py-24">
        <Reveal>
          <SectionHeader kicker="Court or conversation" heading={home.paths.heading} />
          <PathsTable
            courtLabel={home.paths.courtLabel}
            mediationLabel={home.paths.mediationLabel}
            rows={home.paths.rows}
            footnote={home.paths.footnote}
          />
        </Reveal>
      </Section>

      <Section tone="mist" className="py-16 sm:py-24">
        <SectionHeader
          kicker="The people"
          heading={home.stories.heading}
          subheading={home.stories.subheading}
        />
        <StoryCards items={home.stories.items} />
      </Section>

      <Section tone="teal" className="py-20 sm:py-28">
        <BenchThread
          heading={home.bench.heading}
          body={home.bench.body}
          fallbackImage={home.bench.fallbackImage}
          reducedMotion={reduced}
        />
      </Section>

      <Section className="py-16 sm:py-24">
        <Reveal>
          <SectionHeader kicker="Today" heading={home.work.heading} />
          <StatusTrack items={home.work.items} />
          <div className="mt-10">
            <Button href={home.work.cta.href} variant="outline">
              {home.work.cta.label}
            </Button>
          </div>
          <TrustRibbon items={home.trust.items} />
        </Reveal>
      </Section>

      <CtaBand
        heading={home.cta.heading}
        body={home.cta.body}
        button={home.cta.button}
      />
    </>
  );
}
