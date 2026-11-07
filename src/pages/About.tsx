import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import about from "../data/about.json";
import { SflLockup } from "../components/illustrations/SflLockup";
import { Seo } from "../components/layout/Seo";
import { CtaBand } from "../components/ui/CtaBand";
import { PageHero } from "../components/ui/PageHero";
import { PersonPanel, type Person } from "../components/ui/PersonPanel";
import { Reveal } from "../components/ui/Reveal";
import { Section } from "../components/ui/Section";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function About() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const people = about.team.items as Person[];
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (id && people.some((person) => person.id === id)) {
      setActiveId(id);
    }
  }, [hash, people]);

  const active = useMemo(
    () => people.find((person) => person.id === activeId) ?? null,
    [activeId, people],
  );

  const openPerson = useCallback(
    (id: string) => {
      setActiveId(id);
      navigate(`/about#${id}`, { replace: true });
    },
    [navigate],
  );

  const closePerson = useCallback(() => {
    setActiveId(null);
    navigate("/about", { replace: true });
  }, [navigate]);

  return (
    <>
      <Seo title={about.meta.title} description={about.meta.description} />
      <Section>
        <PageHero
          eyebrow={about.hero.eyebrow}
          heading={about.hero.heading}
          body={about.hero.body}
        />
      </Section>

      <Section className="pb-8">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">{about.team.heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {people.map((person, index) => (
            <motion.button
              key={person.id}
              type="button"
              id={person.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              onClick={() => openPerson(person.id)}
              className="hover-card group scroll-mt-28 overflow-hidden rounded-3xl bg-cream text-left"
            >
              <img
                src={person.image.src}
                alt={person.image.alt}
                className="zoom-img h-64 w-full object-cover object-top"
              />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-ink group-hover:text-teal">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-ink/65">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {person.shortBio}
                </p>
                <span className="meet-link mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Read their story →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      <Section tone="teal" className="my-12 py-16 sm:py-24">
        <div className="flex justify-center" aria-hidden="true">
          <svg viewBox="0 0 220 24" className="h-8 w-56">
            <line
              x1="10"
              y1="12"
              x2="210"
              y2="12"
              stroke="#F7F2EA"
              strokeWidth="1.6"
            />
            <circle cx="10" cy="12" r="5" fill="#F7F2EA" />
            <circle cx="80" cy="12" r="4.5" fill="#C9683F" />
            <circle cx="140" cy="12" r="4.5" fill="#C9683F" />
            <circle cx="210" cy="12" r="5" fill="#F7F2EA" />
          </svg>
        </div>
        <Reveal>
          <h2 className="mt-8 text-center font-serif text-3xl text-cream sm:text-4xl">
            {about.values.heading}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {about.values.items.map((value, index) => (
            <motion.article
              key={value.heading}
              className="text-center md:text-left"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
            >
              <p className="font-serif text-4xl text-cream/40 sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-cream">{value.heading}</h3>
              <p className="mt-3 leading-relaxed text-cream/75">{value.body}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <Reveal>
          <h2 className="font-serif text-3xl">{about.supporters.heading}</h2>
          <p className="mt-3 max-w-2xl text-ink/75">{about.supporters.body}</p>
          <div className="mt-5">
            <SflLockup
              label={about.supporters.sfl.label}
              href={about.supporters.sfl.href}
            />
          </div>
        </Reveal>
      </Section>

      <CtaBand
        heading={about.cta.heading}
        body={about.cta.body}
        button={about.cta.button}
      />

      <PersonPanel person={active} onClose={closePerson} />
    </>
  );
}
