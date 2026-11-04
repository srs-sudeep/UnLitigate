import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

type Story = {
  id: string;
  name: string;
  role: string;
  heading: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
};

export function StoryCards({ items }: { items: Story[] }) {
  return (
    <div className="space-y-16">
      {items.map((story, index) => (
        <Reveal key={story.id}>
        <article
          className={`group grid items-center gap-8 md:grid-cols-2 ${
            index % 2 === 1 ? "md:[&>img]:order-last" : ""
          }`}
        >
          <img
            src={story.image.src}
            alt={story.image.alt}
            className="zoom-img h-72 w-full rounded-3xl object-cover md:h-80"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              {story.role}
            </p>
            <h3 className="mt-2 font-serif text-3xl">{story.heading}</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-ink/75">
              {story.body.split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">{story.name}</p>
            <Link
              to={story.href}
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal transition-transform hover:gap-2"
            >
              Meet {story.name.split(" ")[0]} →
            </Link>
          </div>
        </article>
        </Reveal>
      ))}
    </div>
  );
}
