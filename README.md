# Claude's Constitution: Illustrated

An illustrated reading experience presenting Anthropic's Claude Constitution as a paginated, book-like website. Built with Astro and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

## Structure

- `src/content/sections/` — Chapter markdown files
- `src/pages/` — Cover page and dynamic chapter routes
- `src/components/` — Navigation, progress bar, page turn controls
- `public/illustrations/` — Placed illustrations (named `ch{NN}-{SS}-{slug}.png`)

## Adding Illustrations

Drop source images into `src/assets/illustrations/`, then use the `place-illustration` Cursor skill to rename, copy to `public/illustrations/`, and insert at a specific location in the markdown.
