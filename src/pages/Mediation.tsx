import mediation from "../data/mediation.json";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { CtaBand } from "../components/ui/CtaBand";
import { FaqList } from "../components/ui/FaqList";
import { PageHero } from "../components/ui/PageHero";
import { PathsTable } from "../components/ui/PathsTable";
import { Section } from "../components/ui/Section";

export function Mediation() {
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

      <Section className="pb-16">
        <PathsTable
          heading={mediation.paths.heading}
          courtLabel={mediation.paths.courtLabel}
          mediationLabel={mediation.paths.mediationLabel}
          rows={mediation.paths.rows}
        />
      </Section>

      <Section tone="mist" className="py-16 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">
          {mediation.situations.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink/70">
          {mediation.situations.subheading}
        </p>
        <div className="mt-10 space-y-10">
          {mediation.situations.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-3xl border border-ink/8 bg-cream p-6 sm:p-8"
            >
              <h3 className="font-serif text-2xl text-ink">{item.heading}</h3>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink/75">
                {item.body}
              </p>
              <div className="mt-6">
                <Button href="form">{mediation.cta.button.label}</Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <h2 className="font-serif text-3xl sm:text-4xl">{mediation.steps.heading}</h2>
        <p className="mt-3 text-lg text-ink/70">{mediation.steps.subheading}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {mediation.steps.items.map((step) => (
            <li
              key={step.number}
              className="rounded-3xl border border-ink/8 bg-mist/30 p-6"
            >
              <span className="font-serif text-3xl text-clay">{step.number}</span>
              <h3 className="mt-2 font-serif text-2xl">{step.heading}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pb-8">
        <div className="rounded-3xl border border-clay/25 bg-[#f3e6dc] p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-ink">
            {mediation.unsuitable.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink/75">
            {mediation.unsuitable.body}
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <h2 className="mb-6 font-serif text-3xl sm:text-4xl">
          {mediation.faq.heading}
        </h2>
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
