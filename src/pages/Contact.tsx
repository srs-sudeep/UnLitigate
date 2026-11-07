import { Link } from "react-router-dom";
import { motion } from "motion/react";
import contact from "../data/contact.json";
import site from "../data/site.json";
import { Seo } from "../components/layout/Seo";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { Section } from "../components/ui/Section";
import { contactEmail, hasPublishedForm, publishedSocialLinks } from "../lib/contact";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function Contact() {
  const socials = publishedSocialLinks();
  const showForm = hasPublishedForm();
  const reduced = usePrefersReducedMotion();

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
        <Reveal>
          <h2 className="font-serif text-3xl">{contact.steps.heading}</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {contact.steps.items.map((step, index) => (
            <motion.li
              key={step.number}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-3xl border border-ink/8 bg-mist/30 p-6"
            >
              <span className="font-serif text-3xl text-clay">{step.number}</span>
              <h3 className="mt-2 font-serif text-2xl">{step.heading}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">
                {step.body.includes("Privacy Policy") ? (
                  <>
                    {step.body.split("Privacy Policy")[0]}
                    <Link to="/privacy" className="font-semibold text-teal hover:underline">
                      Privacy Policy
                    </Link>
                    {step.body.split("Privacy Policy")[1]}
                  </>
                ) : (
                  step.body
                )}
              </p>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section className="py-12 text-center">
        <Reveal>
          <p className="text-sm font-medium text-rust">{contact.form.note}</p>
          <div className="mt-5">
            {showForm ? (
              <Button href={contact.form.button.href} className="min-w-48">
                {contact.form.button.label}
              </Button>
            ) : (
              <p className="text-sm text-ink/60">
                The enquiry form link will appear here once it is ready.
              </p>
            )}
          </div>
        </Reveal>
      </Section>

      <Section className="pb-20">
        <Reveal>
          <div className="rounded-3xl border border-ink/8 bg-cream p-6 sm:p-8">
            <h2 className="font-serif text-2xl">{contact.other.heading}</h2>
            <p className="mt-2 text-ink/70">{contact.other.body}</p>
            <div className="mt-6 flex flex-col gap-2 text-[15px]">
              <a href={contactEmail.href} className="text-teal hover:underline">
                {contactEmail.label}
              </a>
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-teal hover:underline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-ink/8 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                Team bios
              </p>
              <div className="mt-3 flex flex-col gap-2 text-[15px]">
                {site.teamLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="text-teal hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link to="/disclaimer" className="font-semibold text-ink/70 hover:text-teal">
                  Disclaimer
                </Link>
                <Link to="/privacy" className="font-semibold text-ink/70 hover:text-teal">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
