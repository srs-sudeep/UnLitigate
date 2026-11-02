import errors from "../../data/errors.json";
import { Seo } from "../layout/Seo";
import { Button } from "./Button";
import { Section } from "./Section";

type Copy = typeof errors.notFound | typeof errors.serverError;

type ErrorScreenProps = {
  copy: Copy;
  onRetry?: () => void;
};

export function ErrorScreen({ copy, onRetry }: ErrorScreenProps) {
  const tertiary = "tertiary" in copy ? copy.tertiary : null;

  return (
    <>
      <Seo title={copy.meta.title} description={copy.meta.description} />
      <Section className="flex min-h-[70vh] items-center py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-serif text-6xl leading-none text-clay sm:text-7xl">
            {copy.code}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">
            {copy.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {copy.primary.href === "retry" ? (
              <Button onClick={onRetry ?? (() => window.location.reload())}>
                {copy.primary.label}
              </Button>
            ) : (
              <Button href={copy.primary.href}>{copy.primary.label}</Button>
            )}
            <Button href={copy.secondary.href} variant="outline">
              {copy.secondary.label}
            </Button>
            {tertiary ? (
              <Button href={tertiary.href} variant="outline">
                {tertiary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
