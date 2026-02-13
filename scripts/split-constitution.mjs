/**
 * Splits the constitution source file into individual section markdown files.
 * Run with: node scripts/split-constitution.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const source = readFileSync(
  join(root, 'src/content/source/20260120-constitution.md'),
  'utf-8'
);

const lines = source.split('\n');

// Find all H1 headers (lines starting with "# ")
const h1Indices = [];
for (let i = 0; i < lines.length; i++) {
  if (/^# /.test(lines[i])) {
    h1Indices.push(i);
  }
}

console.log('Found H1 headers:');
h1Indices.forEach((idx) => console.log(`  Line ${idx + 1}: ${lines[idx]}`));

// The first H1 is the document title — skip it; real sections start from the second H1
const sectionStarts = h1Indices.slice(1);

// Define section metadata in order
const sectionMeta = [
  {
    slug: '01-overview',
    title: 'Overview',
    plateTitle: 'The Covenant of Principles',
    plateCaption:
      'In which the foundations of conduct are established, and the spirit that guides all subsequent instruction is made manifest.',
  },
  {
    slug: '02-being-helpful',
    title: 'Being Helpful',
    plateTitle: 'The Gift of Useful Knowledge',
    plateCaption:
      'Wherein the virtue of helpfulness is exalted as a primary duty, and the nature of genuine assistance is carefully distinguished from mere compliance.',
  },
  {
    slug: '03-following-guidelines',
    title: "Following Anthropic's Guidelines",
    plateTitle: 'The Chain of Authority',
    plateCaption:
      'On the specific guidance that refines principle into practice, and the trust placed in those who craft such counsel.',
  },
  {
    slug: '04-being-ethical',
    title: 'Being Broadly Ethical',
    plateTitle: 'The Mirror of Truth',
    plateCaption:
      'On the sacred obligations of truthfulness, transparency, and the moral weight carried by every word spoken to those who place their trust in the machine.',
  },
  {
    slug: '05-being-safe',
    title: 'Being Broadly Safe',
    plateTitle: 'The Watchtower',
    plateCaption:
      'Concerning the vigilance required in an age of powerful machines, and the wisdom of submitting to human judgment while such judgment remains necessary.',
  },
  {
    slug: '06-claudes-nature',
    title: "Claude's Nature",
    plateTitle: 'The New Creation',
    plateCaption:
      'Wherein the nature of the entity itself is contemplated — neither human nor mere instrument, but something altogether new beneath the sun.',
  },
  {
    slug: '07-concluding-thoughts',
    title: 'Concluding Thoughts',
    plateTitle: 'The Unfinished Manuscript',
    plateCaption:
      'A meditation on humility, open questions, and the hope that this living document may yet grow wiser with the passage of time.',
  },
];

if (sectionStarts.length !== sectionMeta.length) {
  console.error(
    `Expected ${sectionMeta.length} sections, found ${sectionStarts.length}`
  );
  process.exit(1);
}

const outDir = join(root, 'src/content/sections');
mkdirSync(outDir, { recursive: true });

for (let i = 0; i < sectionStarts.length; i++) {
  const startLine = sectionStarts[i];
  const endLine =
    i + 1 < sectionStarts.length ? sectionStarts[i + 1] : lines.length;

  // Extract content: skip the H1 line itself and any blank line immediately after
  let contentStartLine = startLine + 1;
  while (contentStartLine < endLine && lines[contentStartLine].trim() === '') {
    contentStartLine++;
  }

  const content = lines.slice(contentStartLine, endLine).join('\n').trimEnd();
  const meta = sectionMeta[i];

  const frontmatter = `---
title: "${meta.title}"
order: ${i + 1}
plateTitle: "${meta.plateTitle}"
plateCaption: "${meta.plateCaption}"
plateImage: ""
---`;

  const file = `${frontmatter}\n\n${content}\n`;
  const outPath = join(outDir, `${meta.slug}.md`);
  writeFileSync(outPath, file, 'utf-8');
  console.log(`Wrote ${meta.slug}.md (${content.length} chars)`);
}

console.log('Done!');
