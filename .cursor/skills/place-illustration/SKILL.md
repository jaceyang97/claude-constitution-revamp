---
name: place-illustration
description: Place an illustration image into the correct chapter of the Claude Constitution project. Use when the user provides an image and specifies where it should be placed, or mentions illustration placement, renaming, or numbering.
---

# Place Illustration

Handles the full workflow of receiving an illustration image and inserting it at a specific location in the constitution content.

## User Provides

1. **Image**: pasted into chat or referenced by path
2. **Placement**: which chapter and where (e.g., "After the 'Being honest' heading, before the first paragraph")

## Workflow

### Step 1: Identify the image file

The image will either be:
- Saved automatically to `C:\Users\Jace\.cursor\projects\a-Projects-claude-constitution-revamp\assets\` (when pasted)
- Referenced by a path the user provides

### Step 2: Determine chapter and sequence number

Chapters map to markdown files in `src/content/sections/`:

| Chapter | File |
|---------|------|
| 1 | `01-overview.md` |
| 2 | `02-being-helpful.md` |
| 3 | `03-following-guidelines.md` |
| 4 | `04-being-ethical.md` |
| 5 | `05-being-safe.md` |
| 6 | `06-claudes-nature.md` |
| 7 | `07-concluding-thoughts.md` |

To find the next sequence number, list existing files in `public/illustrations/` matching `ch{NN}-*` and increment.

### Step 3: Build the filename

**Convention**: `ch{NN}-{SS}-{slug}.{ext}`

| Part | Description | Example |
|------|-------------|---------|
| `NN` | Chapter number, zero-padded | `01` |
| `SS` | Sequence within chapter, zero-padded | `03` |
| `slug` | Kebab-case placement context (heading or paragraph keyword) | `mission-of-anthropic` |
| `ext` | Original file extension (preserve as-is) | `png` |

Derive the slug from the heading or paragraph the image follows. Keep it short (2-5 words).

### Step 4: Copy the image

Copy the source image to: `public/illustrations/{filename}`

```bash
Copy-Item "{source}" "public/illustrations/{filename}"
```

Do NOT keep a second copy in `src/assets/illustrations/`.

### Step 5: Insert the markdown image tag

Open the target chapter markdown file and insert:

```markdown
![Illustration](/illustrations/{filename})
```

**Placement rules**:
- Insert a blank line before and after the image tag
- Place it exactly where the user specified (after a heading, between paragraphs, etc.)
- Do NOT break mid-paragraph — always place between block-level elements
- Use `StrReplace` with enough surrounding context to place precisely

### Step 6: Confirm

Report back:
- Filename: `ch{NN}-{SS}-{slug}.{ext}`
- Location: `public/illustrations/`
- Placed in: `{chapter file}` after `{heading/context}`

## Example

**User says**: "Place this after the 'Being honest' heading in chapter 4"

1. List `public/illustrations/ch04-*` → finds `ch04-01-...`, `ch04-02-...`
2. Next sequence: `03`
3. Filename: `ch04-03-being-honest.png`
4. Copy to `public/illustrations/ch04-03-being-honest.png`
5. In `04-being-ethical.md`, insert after `## Being honest` heading:

```markdown
## Being honest

![Illustration](/illustrations/ch04-03-being-honest.png)

Claude should be honest...
```

6. Confirm placement to user.
