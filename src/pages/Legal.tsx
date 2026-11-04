import { Link } from "react-router-dom";
import legal from "../data/legal.json";
import { Seo } from "../components/layout/Seo";
import { PageHero } from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";

type Kind = "disclaimer" | "privacy";

export function Legal({ kind }: { kind: Kind }) {
  const page = legal[kind];

  return (
    <>
      <Seo title={page.meta.title} description={page.meta.description} />
      <Section>
        <PageHero
          eyebrow={page.eyebrow}
          heading={page.heading}
          body={page.draftNote}
        />
      </Section>
      <Section className="pb-20">
        <div className="mx-auto max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-serif text-2xl text-ink sm:text-3xl">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/75">{section.body}</p>
            </article>
          ))}
          <p className="pt-4 text-sm text-ink/55">
            <Link to="/get-in-touch" className="font-semibold text-teal hover:underline">
              Get in Touch
            </Link>
            {" · "}
            <Link to="/" className="font-semibold text-teal hover:underline">
              Back home
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
