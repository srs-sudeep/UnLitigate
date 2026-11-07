import { motion } from "motion/react";
import mediation from "../data/mediation.json";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { CtaBand } from "../components/ui/CtaBand";
import { ExampleWalkthrough } from "../components/ui/ExampleWalkthrough";
import { FaqList } from "../components/ui/FaqList";
import { MediatorMatters } from "../components/ui/MediatorMatters";
import { PageHero } from "../components/ui/PageHero";
import { PathsTable } from "../components/ui/PathsTable";
import { Reveal } from "../components/ui/Reveal";
import { Section } from "../components/ui/Section";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function Mediation() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <Seo title={mediation.meta.title} description={mediation.meta.description} />
      <Section>
        <PageHero
          eyebrow={mediation.hero.eyebrow}
          heading={mediation.hero.heading}
          body={mediation.hero.body}
        />
      </Section>

      <Section className="pb-20">
        <PathsTable
          heading={mediation.paths.heading}
          courtLabel={mediation.paths.courtLabel}
          mediationLabel={mediation.paths.mediationLabel}
          rows={mediation.paths.rows}
        />
      </Section>

      <Section className="py-16 sm:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">{mediation.steps.heading}</h2>
          <p className="mt-3 text-lg text-ink/70">{mediation.steps.subheading}</p>
        </Reveal>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {mediation.steps.items.map((step, index) => (
            <motion.li
              key={step.number}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="rounded-3xl border border-ink/8 bg-mist/30 p-6"
            >
              <span className="font-serif text-3xl text-clay">{step.number}</span>
              <h3 className="mt-2 font-serif text-2xl">{step.heading}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section tone="teal" className="py-16 sm:py-24">
        <MediatorMatters
          eyebrow={mediation.mediatorMatters.eyebrow}
          heading={mediation.mediatorMatters.heading}
          body={mediation.mediatorMatters.body}
          cards={mediation.mediatorMatters.cards as Array<{
            heading: string;
            body: string;
            icon: "neutral" | "time" | "decision";
          }>}
          bullets={mediation.mediatorMatters.bullets as Array<{
            emphasis?: string;
            text: string;
            tone?: "clay" | "teal";
          }>}
          footnote={mediation.mediatorMatters.footnote}
        />
      </Section>

      <Section tone="mist" className="py-16 sm:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">
            {mediation.situations.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/70">
            {mediation.situations.subheading}
          </p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {mediation.situations.items.map((item, index) => (
            <motion.article
              key={item.id}
              id={item.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              className="scroll-mt-28 rounded-3xl border border-ink/8 bg-cream p-6 sm:p-8"
            >
              <h3 className="font-serif text-2xl text-ink">{item.heading}</h3>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink/75">
                {item.body}
              </p>
              <div className="mt-6">
                <Button href="/get-in-touch">{mediation.cta.button.label}</Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="pb-8 pt-8">
        <ExampleWalkthrough
          heading={mediation.example.heading}
          label={mediation.example.label}
          steps={mediation.example.steps}
        />
      </Section>

      <Section className="pb-8">
        <Reveal>
          <div className="rounded-3xl border border-clay/25 bg-[#f3e6dc] p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-ink">
              {mediation.unsuitable.heading}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink/75">
              {mediation.unsuitable.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="py-16 sm:py-20">
        <Reveal>
          <h2 className="mb-6 font-serif text-3xl sm:text-4xl">
            {mediation.faq.heading}
          </h2>
        </Reveal>
        <FaqList items={mediation.faq.items} />
      </Section>

      <CtaBand
        heading={mediation.cta.heading}
        body={mediation.cta.body}
        button={mediation.cta.button}
      />
    </>
  );
}
