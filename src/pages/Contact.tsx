import contact from "../data/contact.json";
import site from "../data/site.json";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";

export function Contact() {
  return (
    <>
      <Seo title={contact.meta.title} description={contact.meta.description} />
      <Section>
        <PageHero
          eyebrow={contact.hero.eyebrow}
          heading={contact.hero.heading}
          body={contact.hero.body}
        />
      </Section>

      <Section className="pb-8">
        <h2 className="font-serif text-3xl">{contact.steps.heading}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {contact.steps.items.map((step) => (
            <li
              key={step.number}
              className="lift rounded-3xl border border-ink/8 bg-mist/30 p-6"
            >
              <span className="font-serif text-3xl text-clay">{step.number}</span>
              <h3 className="mt-2 font-serif text-2xl">{step.heading}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="py-12 text-center">
        <p className="text-sm font-medium text-rust">{contact.form.note}</p>
        <div className="mt-5">
          <Button href={contact.form.button.href} className="min-w-48">
            {contact.form.button.label}
          </Button>
        </div>
      </Section>

      <Section className="pb-20">
        <div className="rounded-3xl border border-ink/8 bg-cream p-6 sm:p-8">
          <h2 className="font-serif text-2xl">{contact.other.heading}</h2>
          <p className="mt-2 text-ink/70">{contact.other.body}</p>
          <div className="mt-6 flex flex-col gap-2 text-[15px]">
            <a href={site.social.email.href} className="text-teal hover:underline">
              {site.social.email.label}
            </a>
            <a
              href={site.social.instagram.href}
              className="text-teal hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.social.instagram.label}
            </a>
            <a
              href={site.social.linkedin.href}
              className="text-teal hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.social.linkedin.label}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
