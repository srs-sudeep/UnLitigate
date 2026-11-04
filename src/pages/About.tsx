import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import about from "../data/about.json";
import { SflLockup } from "../components/illustrations/SflLockup";
import { Seo } from "../components/layout/Seo";
import { CtaBand } from "../components/ui/CtaBand";
import { PageHero } from "../components/ui/PageHero";
import { PersonPanel, type Person } from "../components/ui/PersonPanel";
import { Section } from "../components/ui/Section";

export function About() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const people = about.team.items as Person[];
  const [activeId, setActiveId] = useState<string | null>(null);

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
        <h2 className="font-serif text-3xl sm:text-4xl">{about.team.heading}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {people.map((person) => (
            <button
              key={person.id}
              type="button"
              id={person.id}
              onClick={() => openPerson(person.id)}
              className="lift group scroll-mt-28 overflow-hidden rounded-3xl border border-ink/8 bg-cream text-left"
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
                <span className="mt-4 inline-block text-sm font-semibold text-teal">
                  Read their story →
                </span>
              </div>
            </button>
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
        <h2 className="mt-8 text-center font-serif text-3xl text-cream sm:text-4xl">
          {about.values.heading}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {about.values.items.map((value, index) => (
            <article key={value.heading} className="text-center md:text-left">
              <p className="font-serif text-4xl text-cream/40 sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-cream">{value.heading}</h3>
              <p className="mt-3 leading-relaxed text-cream/75">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <h2 className="font-serif text-3xl">{about.supporters.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{about.supporters.body}</p>
        <div className="mt-5">
          <SflLockup
            label={about.supporters.sfl.label}
            href={about.supporters.sfl.href}
          />
        </div>
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
