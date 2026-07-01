# Sanghyun Park Blog Design System

## 1. Atmosphere & Identity

The blog should read like a quiet research notebook: warm paper, restrained dividers, dense technical content, and enough width for code, tables, and figures. The recognizable signature is a soft editorial surface with warm brown accents and monospace detail where precision matters.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/page | `--paper` | `#f4efe6` | n/a | Body background |
| Surface/soft | `--paper-soft` | `#fbf8f3` | n/a | Blockquotes, callouts, raised content |
| Text/primary | `--ink` | `#2b2520` | n/a | Body, headings, navigation |
| Text/secondary | `--muted` | `#6f655d` | n/a | Metadata, captions, secondary labels |
| Border/default | `--line` | `#d7cbbd` | n/a | Dividers and table borders |
| Border/strong | `--line-strong` | `#c7b7a6` | n/a | Table header dividers |
| Accent/primary | `--accent` | `#9a5a2d` | n/a | Links, active states, TOC affordances |
| Accent/soft | `--accent-soft` | `rgba(154, 90, 45, 0.1)` | n/a | Inline code backgrounds and subtle highlights |
| Severity/none | `--severity-none`, `--severity-none-soft` | `#5f6a5f`, `rgba(95, 106, 95, 0.12)` | n/a | CVSS severity badge |
| Severity/low | `--severity-low`, `--severity-low-soft` | `#4d6258`, `rgba(77, 98, 88, 0.12)` | n/a | CVSS severity badge |
| Severity/medium | `--severity-medium`, `--severity-medium-soft` | `#765128`, `rgba(118, 81, 40, 0.13)` | n/a | CVSS severity badge |
| Severity/high | `--severity-high`, `--severity-high-soft` | `#8a3831`, `rgba(138, 56, 49, 0.13)` | n/a | CVSS severity badge |
| Severity/critical | `--severity-critical`, `--severity-critical-soft` | `#6f2735`, `rgba(111, 39, 53, 0.13)` | n/a | CVSS severity badge |
| Code/background | `--code-bg` | `#f8f4ee` | n/a | Code blocks |
| Code/border | `--code-line` | `#ddd1c1` | n/a | Code block borders |

### Rules

- Keep the site light-mode only unless a dark palette is explicitly designed.
- Use `--accent` for links and interactive affordances, not decoration.
- Technical surfaces should stay warm and readable; avoid high-saturation blues or purple gradients.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Page title | Theme default / responsive | 800 | 1.05 | `-0.03em` | Article and page titles |
| Section heading | Theme default | 700 | Theme default | `-0.03em` | `h2`, `h3`, archive headings |
| Body | `1.03rem` | 400 | 1.7 | 0 | Article prose |
| Inline code | `0.9em` | 400 | inherited | 0 | Inline technical tokens |
| Metadata | Theme default | 700 | Theme default | `0.08em` | Dates, taxonomy labels |

### Font Stack

- Primary: `"Nanum Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Mono: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

### Rules

- Body copy should stay readable for Korean and English.
- Long-form prose should keep a comfortable measure; tables, code, and figures may use the wider article canvas.
- Use monospace only for code, identifiers, short technical labels, and CVE lists.

## 4. Spacing & Layout

### Base Unit

Spacing follows a 4px-derived rhythm, expressed in `rem` where possible.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `0.25rem` | Tight inline gaps |
| `--space-2` | `0.5rem` | Compact controls and labels |
| `--space-3` | `0.75rem` | Navigation padding |
| `--space-4` | `1rem` | Default block padding |
| `--space-5` | `1.25rem` | Card and TOC padding |
| `--space-6` | `1.5rem` | Tablet/desktop gutters |
| `--space-8` | `2rem` | Section separation |
| `--space-10` | `2.5rem` | Page-level separation |

### Grid

- Site max width: `--site-max`, currently 92rem for article and masthead surfaces.
- Article max width: `--article-max`, wide enough for research tables and code.
- Prose max width: `--article-copy`, narrower than the article canvas to keep paragraphs readable.
- TOC max width: `--toc-max`, currently 38rem for compact outline scanning.
- Breakpoints follow the Minimal Mistakes theme and existing `48em` custom breakpoint.

### Rules

- Prefer widening the article canvas over shrinking tables or code.
- Do not put page sections inside decorative cards.
- Navigation, main content, and footer should share the same outer max-width rhythm.

## 5. Components

### Masthead

- **Structure**: full-width masthead, constrained inner wrap, site title, visible links, optional search/menu controls.
- **Variants**: desktop expanded links, mobile greedy navigation.
- **Spacing**: outer gutter uses `--space-4` to `--space-6`; nav links use compact horizontal padding.
- **States**: hover and focus shift link color from muted text to primary ink/accent.
- **Accessibility**: preserve existing semantic `nav` and screen-reader labels.
- **Motion**: no decorative motion; keep the existing theme transition only.

### Article Canvas

- **Structure**: centered single-column article with no right-side TOC reservation.
- **Variants**: prose-constrained blocks and full-width technical blocks.
- **Spacing**: article width comes from `--article-max`; prose measure comes from `--article-copy`.
- **States**: tables and code blocks scroll horizontally when needed.
- **Accessibility**: preserve semantic article, headings, and table markup.
- **Motion**: none.

### External Links

- **Structure**: normal anchors rendered by Markdown, Liquid, or theme includes.
- **Variants**: external `http` and `https` destinations open in a new tab; same-site links, anchors, downloads, and non-web protocols keep their default behavior.
- **Spacing**: no visual decoration changes.
- **States**: preserve existing link hover and focus behavior.
- **Accessibility**: keep link text meaningful and add `rel="noopener noreferrer"` for cross-origin new-tab links.
- **Motion**: none.

### Article TOC

- **Structure**: top-of-article navigation rendered from the existing Jekyll TOC include.
- **Variants**: compact ordered outline, nested only to the first useful subsection level.
- **Spacing**: constrained to prose width, compact header, soft paper background.
- **States**: link hover/focus uses accent color and underline.
- **Accessibility**: `aria-labelledby` points to the TOC title.
- **Motion**: none.

### CVE Archive Row

- **Structure**: linked CVE identifier, affected product or subsystem, and a compact CVSS label.
- **Variants**: structured CVSS fields render as `CVSS <version> <score> <severity>`; entries without structured fields fall back to `severity`.
- **Spacing**: rows use divider lines and inline wrapping instead of cards.
- **States**: the CVE identifier keeps standard link hover and focus behavior.
- **Accessibility**: keep the CVE identifier as the primary link target and expose severity as readable text.
- **Motion**: none.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | ease-in-out | Link and navigation color changes |
| Standard | 200ms | ease-in-out | Existing theme hover transitions |

### Rules

- Do not add decorative animation to article reading surfaces.
- Keep focus states visible for navigation and TOC links.
- Use `transform` or `opacity` only if a future interaction truly needs motion.

## 7. Depth & Surface

### Strategy

The blog uses mixed but subtle depth: warm paper surfaces, thin borders, and very soft shadows only for framed technical or media blocks.

| Type | Value | Usage |
|------|-------|-------|
| Border/default | `1px solid var(--line)` | Tables, masthead, footer, TOC |
| Border/code | `1px solid var(--code-line)` | Code blocks |
| Shadow/subtle | `var(--shadow)` | Images and media |
| Radius/default | `var(--radius)` | Images, tables, code blocks |
| Radius/compact | `var(--radius-compact)` | Compact TOC and small framed controls |
| Radius/label | `var(--radius-label)` | Inline metadata badges and chips |

### Rules

- Borders carry most of the hierarchy.
- Shadows should stay warm and subtle.
- Nested cards are not part of this system.
