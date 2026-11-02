import { Button } from "./Button";
import { Section } from "./Section";

type CtaBandProps = {
  heading: string;
  body: string;
  button: { label: string; href: string };
};

export function CtaBand({ heading, body, button }: CtaBandProps) {
  return (
    <Section className="py-20 sm:py-24 text-center">
      <h2 className="font-serif text-3xl sm:text-4xl text-ink">{heading}</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
        {body}
      </p>
      <div className="mt-8">
        <Button href={button.href}>{button.label}</Button>
      </div>
    </Section>
  );
}
