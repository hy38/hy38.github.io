# About Page Redesign — Design

Date: 2026-07-08
Status: Approved

## Goal

Replace the flat, bullet-list About page (`_pages/about.md`) with a visually
structured page that leads with Sanghyun's strongest credentials and follows
the site's existing design system (DESIGN.md: warm paper, borders-not-cards,
accent used for affordances only).

## Approach

Approach B: custom About-page components. Structured HTML with scoped classes
inside `_pages/about.md` (kramdown allows raw HTML), styled by new rules
appended to `assets/css/main.scss` using existing design tokens
(`--paper-soft`, `--line`, `--accent`, `--muted`, `--space-*`, `--radius-*`).
No new layout, no new data files, no theme overrides.

## Page structure

All sections live in `_pages/about.md` under `layout: single`,
`classes: wide`, `author_profile: true`.

1. **Hero intro** (`.about-hero`)
   - Tagline line: "Security Researcher · AI-driven Pentester" in muted
     mono/uppercase metadata style.
   - Positioning paragraph (~3 sentences): offensive automotive security at
     Autocrypt (Vehicle Threat Research Lab); AI-driven fuzzing background
     from KAIST (M.S., LLM1dFuzz); independent vulnerability research on the
     Linux kernel and widely used open-source software.

2. **Highlights stat strip** (`.about-stats`)
   - Border-divided horizontal strip (wraps to 2×2 on mobile), no cards.
   - Big numbers in mono, small muted labels:
     - `7` Linux kernel 0-days discovered
     - `14` BusyBox 0-days discovered
     - `CVE-2026-53239` High · CVSS 7.8 (links to the CVE writeup)
     - `361+` fuzzers cataloged in Fuzzing Survey
   - Numbers link to relevant pages where they exist (CVE page, research page).

3. **Experience timeline** (`.about-timeline`)
   - Left-border timeline, each entry: role + org in bold, dates + location in
     muted mono, one description line.
   - Entries: Autocrypt Security Researcher (Jun 2025–present, Vehicle Threat
     Research Lab — offensive research on in-vehicle networks, protocols,
     wireless attack surfaces); KAIST Graduate Researcher (Feb 2023–Feb 2025,
     Software Security Lab); CNU Student Intern (Apr 2022–Feb 2023, Mobile
     Distributed Computing Lab); Purdue Visiting Scholar (Dec 2021–Feb 2022,
     Indianapolis).

4. **Selected work** (`.about-work`)
   - Compact list rows (divider lines): project name in bold, one-line
     description, muted date range.
   - Entries: Linux Kernel Vulnerability Research (2026–present); BBXFuzz
     (2026, 14 0-days in BusyBox applets); LLM1dFuzz (KAIST thesis work,
     LLM-guided 1-day reproduction feeding directed fuzzing); Fuzzing Survey
     (2023–present, genealogy of 361+ fuzzers). Link to /research/ and CVE
     archive where relevant.

5. **Publications** (`.about-pubs`)
   - Citation-style list: title (bold, linked to PDF in /assets/papers/),
     venue + year in muted text.
   - SECAI 2024 (Systematic Bug Reproduction with Large Language Model);
     CUI 2024 (ChatFive); IEEE SAS 2022 (Shot Group / LoRa / YOLO v5).

6. **Education & Certifications** (`.about-edu`)
   - Two short lists side by side on desktop, stacked on mobile.
   - Education: KAIST M.S. Computer Science (2023–2025, advisor Sang Kil Cha);
     CNU B.S. Computer Science and Engineering (2017–2023, GPA 4.21/4.5).
   - Certifications: Engineer Information Processing (HRD Korea, 2025);
     Cryptography I (Stanford, 2025); SQLD (K-DATA, 2021). No cert ID numbers.

7. **Skills** (`.about-skills`)
   - Grouped chip rows using the existing label-radius token:
     - Offensive Security: penetration testing, fuzzing, directed fuzzing,
       vulnerability analysis, crash triage, root-cause analysis, exploit
       assessment.
     - Languages & Tooling: C, C++, Python, Bash, SQL, Docker, Git.
     - Human languages: Korean, English.

8. **Contact** — short line with email, GitHub, LinkedIn links (author
   sidebar already shows icons; keep this as plain prose, no component).

## Config change

`_config.yml` author bio: "Security engineer and researcher" →
"Security Researcher · AI-driven Pentester". Page front matter `excerpt`
updated to match the new positioning.

## CSS

Append an "About page" section to `assets/css/main.scss`:
- Use only existing tokens; no new colors.
- Borders carry hierarchy (per DESIGN.md); no cards, no shadows, no motion.
- Stat strip: flex row, `border-top`/`border-bottom` with internal dividers;
  numbers in mono at ~1.6rem, labels in muted small caps.
- Timeline: `border-left: 1px solid var(--line)` with padded entries.
- Chips: inline-flex, `--accent-soft` background, `--radius-label`.
- Responsive at the existing `48em` breakpoint.

## Error handling / testing

- Build with `bundle exec jekyll build` and verify no Liquid/kramdown errors.
- Manually verify rendered HTML structure in `_site/about/index.html`
  (sections present, links resolve to existing paths).
- Verify all internal links (/research/, CVE page, PDFs) point at files that
  exist in the repo.

## Out of scope

- No changes to other pages, layouts, or the theme.
- No dark mode.
- No cert ID numbers or private data; employer and dates are already public
  on LinkedIn.
