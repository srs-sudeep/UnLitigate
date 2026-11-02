# UnLitigate

Student-led site for UnLitigate — a non-commercial initiative that promotes mediation first in India. Five static pages, React + Tailwind, all copy in JSON.

## Edit copy and photos

You do not need to open JSX files to change text or images.

- Copy lives in [`src/data/`](src/data/)
  - `site.json` — nav, footer, form URL, email, Instagram, LinkedIn, logos
  - `home.json` — Home
  - `mediation.json` — Mediation Explained
  - `whatWeDo.json` — What UnLitigate Does
  - `about.json` — About Us
  - `contact.json` — Get in Touch
- Photos and logos live in [`public/assets/`](public/assets/)
  - Each image slot in JSON is `{ "src", "alt", "credit" }`
  - Replace a file, or change `src` to point at a new one

The enquiry button opens the Google Form URL in `site.json` → `form.url` in a new tab.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Stack

Vite, React, TypeScript, Tailwind CSS, React Router, GSAP, Lenis, Motion.

Palette and type follow the UnLitigate moodboard: cream, teal, ink, mist, clay. Headlines are Fraunces; body is Source Sans 3.
