import { Link } from "react-router-dom";
import { motion } from "motion/react";
import home from "../data/home.json";
import site from "../data/site.json";
import { BenchThread } from "../components/illustrations/BenchThread";
import { Doors } from "../components/illustrations/Doors";
import { SflLockup } from "../components/illustrations/SflLockup";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { CtaBand } from "../components/ui/CtaBand";
import { PathsTable } from "../components/ui/PathsTable";
import { Section } from "../components/ui/Section";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SituationIcon } from "../components/ui/SituationIcon";
import { StatusCard } from "../components/ui/StatusCard";
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
            <div className="mt-6">
              <SflLockup label={site.sfl.label} href={site.sfl.href} />
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
                className="lift group block h-full rounded-3xl border border-ink/8 bg-cream p-5"
              >
                <SituationIcon id={item.id} />
                <h3 className="mt-4 font-serif text-xl text-ink">{item.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <SectionHeader kicker="Court or conversation" heading={home.paths.heading} />
        <PathsTable
          courtLabel={home.paths.courtLabel}
          mediationLabel={home.paths.mediationLabel}
          rows={home.paths.rows}
          footnote={home.paths.footnote}
        />
      </Section>

      <Section tone="mist" className="py-16 sm:py-24">
        <SectionHeader
          kicker="The people"
          heading={home.stories.heading}
          subheading={home.stories.subheading}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {home.stories.items.map((story) => (
            <article
              key={story.id}
              className="lift group overflow-hidden rounded-3xl border border-ink/8 bg-cream"
            >
              <img
                src={story.image.src}
                alt={story.image.alt}
                className="zoom-img h-56 w-full object-cover"
              />
              <div className="p-6">
                <p className="font-serif text-xl leading-snug text-ink">
                  “{story.quote}”
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {story.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-teal">
                  {story.name}, {story.role}
                </p>
              </div>
            </article>
          ))}
        </div>
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
        <SectionHeader kicker="Today" heading={home.work.heading} />
        <div className="grid gap-4 md:grid-cols-3">
          {home.work.items.map((item) => (
            <StatusCard
              key={item.heading}
              status={item.status}
              heading={item.heading}
              body={item.body}
            />
          ))}
        </div>
        <div className="mt-8">
          <Button href={home.work.cta.href} variant="outline">
            {home.work.cta.label}
          </Button>
        </div>
      </Section>

      <Section tone="mist" className="py-12 sm:py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {home.trust.items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="lift rounded-2xl border border-ink/10 bg-cream px-4 py-5 text-center text-sm font-medium leading-snug text-ink/80 hover:border-teal/40 hover:text-teal"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <SectionHeader kicker="The team" heading={home.team.heading} />
        <div className="grid gap-5 md:grid-cols-3">
          {home.team.items.map((person) => (
            <article
              key={person.id}
              className="lift group overflow-hidden rounded-3xl border border-ink/8 bg-mist/40"
            >
              <img
                src={person.image.src}
                alt={person.image.alt}
                className="zoom-img h-64 w-full object-cover object-top"
              />
              <div className="p-5">
                <h3 className="font-serif text-2xl">{person.name}</h3>
                <p className="mt-1 text-sm text-ink/65">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        heading={home.cta.heading}
        body={home.cta.body}
        button={home.cta.button}
      />
    </>
  );
}
