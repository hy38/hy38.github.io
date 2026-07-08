# About Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat bullet-list About page with a visually structured page (hero, stat strip, timeline, work list, publications, education, skill chips) that leads with Sanghyun's strongest credentials.

**Architecture:** Structured HTML with `about-*` classes inside `_pages/about.md` (kramdown passes raw block HTML through), styled by a new "About page" section appended to `assets/css/main.scss` using only existing design tokens from DESIGN.md (borders carry hierarchy; no cards, no shadows, no motion). One-line author bio update in `_config.yml`.

**Tech Stack:** Jekyll 3.10 (Minimal Mistakes remote theme), kramdown, SCSS via jekyll-sass-converter.

**Spec:** `docs/superpowers/specs/2026-07-08-about-page-redesign-design.md`

---

## Environment setup (required before every task)

The system Ruby has no dev headers and there is no sudo. A portable Ruby 3.3.6 is already installed at `~/.rubies/x64` (rbconfig patched, gems already bundle-installed into `vendor/bundle`). Every shell that runs a build MUST export:

```bash
export PATH=$HOME/.rubies/x64/bin:$PATH
export LD_LIBRARY_PATH=$HOME/.rubies/x64/lib
export RUBYLIB=$HOME/.rubies/x64/lib/ruby/site_ruby/3.3.0:$HOME/.rubies/x64/lib/ruby/3.3.0:$HOME/.rubies/x64/lib/ruby/3.3.0/x86_64-linux
cd /home/hy38/hy38.github.io
```

Build command: `bundle exec jekyll build` (warnings about faraday-retry and sass deprecation are normal; success = exit code 0 and "done in N seconds").

**Commit rule:** NEVER add a Co-authored-by / Copilot trailer to commits (user instruction).

**Verified link targets** (all confirmed to exist):
- `/cves/` (from `_pages/cves.html`)
- `/cves/cve-2026-53239-linux-xfrm-policy-uaf/` (collection permalink `/cves/:path/`)
- `/research/bbxfuzz-source-aware-stall-breaking/` (collection permalink `/research/:path/`)
- `/assets/papers/SECAI-2024.pdf`, `SECAI-2024-long-version.pdf`, `CUI-2024.pdf`, `SAS-2022.pdf`
- `https://fuzzing-survey.org/` (returns HTTP 200)

---

### Task 1: Rewrite `_pages/about.md`

**Files:**
- Modify: `_pages/about.md` (replace entire file)

- [ ] **Step 1: Replace the full contents of `_pages/about.md` with:**

````markdown
---
permalink: /about/
title: "About Sanghyun Park"
excerpt: "Security researcher and AI-driven pentester working on automotive offensive security, fuzzing, and vulnerability research."
last_modified_at: 2026-07-08T00:00:00+09:00
author_profile: true
layout: single
toc: false
classes: wide
---

<div class="about-hero">
  <p class="about-tagline">Security Researcher · AI-driven Pentester</p>
  <p class="about-lead">I do offensive security research at <strong>Autocrypt</strong>'s Vehicle Threat Research Lab, testing real vehicles and ECUs across in-vehicle networks, communication protocols, and wireless attack surfaces. My background is AI-driven fuzzing: at <strong>KAIST</strong>'s Software Security Lab I built LLM1dFuzz, an LLM-guided framework that reproduces real-world 1-day vulnerabilities and feeds directed fuzzing. Outside work I hunt memory-safety and concurrency bugs in the Linux kernel and widely used open-source software — and get them fixed upstream.</p>
</div>

<div class="about-stats">
  <a class="about-stat" href="/cves/">
    <span class="about-stat__value">7</span>
    <span class="about-stat__label">Linux kernel 0-days discovered</span>
  </a>
  <a class="about-stat" href="/research/bbxfuzz-source-aware-stall-breaking/">
    <span class="about-stat__value">14</span>
    <span class="about-stat__label">BusyBox 0-days discovered</span>
  </a>
  <a class="about-stat" href="/cves/cve-2026-53239-linux-xfrm-policy-uaf/">
    <span class="about-stat__value about-stat__value--sm">CVE-2026-53239</span>
    <span class="about-stat__label">Linux XFRM UAF · High · CVSS 7.8</span>
  </a>
  <a class="about-stat" href="https://fuzzing-survey.org/">
    <span class="about-stat__value">361+</span>
    <span class="about-stat__label">Fuzzers cataloged in Fuzzing Survey</span>
  </a>
</div>

## Experience

<ol class="about-timeline">
  <li>
    <p class="about-entry__meta">Jun 2025 – Present · Seoul, South Korea</p>
    <h3 class="about-entry__title">Security Researcher · Autocrypt</h3>
    <p>Vehicle Threat Research Lab. Offensive vehicle security research: penetration testing of in-vehicle networks, embedded ECUs, and wireless attack surfaces, plus automation tooling used to assess next-generation mobility systems.</p>
  </li>
  <li>
    <p class="about-entry__meta">Feb 2023 – Feb 2025 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Graduate Researcher · KAIST Software Security Lab</h3>
    <p>Researched fuzzing and LLM-assisted vulnerability reproduction under Prof. Sang Kil Cha. Built LLM1dFuzz and maintained the Fuzzing Survey genealogy.</p>
  </li>
  <li>
    <p class="about-entry__meta">Apr 2022 – Feb 2023 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Research Intern · CNU Mobile Distributed Computing Lab</h3>
    <p>IoT systems research; co-authored an IEEE SAS 2022 paper on long-range shot-group measurement.</p>
  </li>
  <li>
    <p class="about-entry__meta">Dec 2021 – Feb 2022 · Indianapolis, USA</p>
    <h3 class="about-entry__title">Visiting Scholar · Purdue University</h3>
    <p>Designed and implemented an IoT shot-group measurement system using LoRa, YOLOv5, and edge computing on Raspberry Pi.</p>
  </li>
  <li>
    <p class="about-entry__meta">Jul 2021 – Dec 2021 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Research Intern · CNU Software Analysis and Testing Lab</h3>
    <p>Automated software testing and analysis research — the start of my security career.</p>
  </li>
</ol>

## Selected Work

<ul class="about-work">
  <li>
    <p class="about-work__head"><strong>Linux Kernel Vulnerability Research</strong><span class="about-work__dates">2026 – present</span></p>
    <p>Independent research on kernel subsystems combining LLM-assisted code analysis, fuzzing, and manual auditing. Seven previously unknown memory-safety and concurrency vulnerabilities reported upstream — including crash reproduction, root-cause analysis, exploitability assessment, and patches submitted through kernel mailing lists. Writeups in the <a href="/cves/">CVE archive</a>.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>BBXFuzz</strong><span class="about-work__dates">2026</span></p>
    <p>LLM-assisted fuzzing campaign against BusyBox applets that surfaced 14 0-day vulnerabilities, from harness generation to crash triage. <a href="/research/bbxfuzz-source-aware-stall-breaking/">Project writeup</a>.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>LLM1dFuzz</strong><span class="about-work__dates">2023 – 2025</span></p>
    <p>Master's thesis: an LLM-guided 1-day vulnerability reproduction framework that analyzes CVEs with multi-stage reasoning, generates bug-triggering inputs, and uses them to seed directed fuzzing. Published at SECAI 2024.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>Fuzzing Survey</strong><span class="about-work__dates">2023 – present</span></p>
    <p>Maintained <a href="https://fuzzing-survey.org/">fuzzing-survey.org</a>, a genealogy database tracking 361+ fuzzers and the papers behind them.</p>
  </li>
</ul>

## Publications

<ul class="about-pubs">
  <li>
    <a href="/assets/papers/SECAI-2024.pdf"><strong>Systematic Bug Reproduction with Large Language Model</strong></a><br>
    <span class="about-pubs__venue">ESORICS Workshop on Security and Artificial Intelligence (SECAI) · 2024 · <a href="/assets/papers/SECAI-2024-long-version.pdf">long version</a></span>
  </li>
  <li>
    <a href="/assets/papers/CUI-2024.pdf"><strong>ChatFive: Enhancing User Experience in Likert Scale Personality Test through Interactive Conversation with LLM Agents</strong></a><br>
    <span class="about-pubs__venue">ACM Conference on Conversational User Interfaces (CUI) · 2024</span>
  </li>
  <li>
    <a href="/assets/papers/SAS-2022.pdf"><strong>Feasibility of Measuring Shot Group Using LoRa Technology and YOLO V5</strong></a><br>
    <span class="about-pubs__venue">IEEE Sensors Applications Symposium (SAS) · 2022</span>
  </li>
</ul>

## Education & Certifications

<div class="about-cols">
  <div>
    <h3>Education</h3>
    <ul>
      <li>
        <strong>KAIST</strong> — M.S., Computer Science (School of Computing)
        <span class="about-item__meta">2023 – 2025 · Advisor: Prof. Sang Kil Cha</span>
      </li>
      <li>
        <strong>Chungnam National University</strong> — B.S., Computer Science and Engineering
        <span class="about-item__meta">2017 – 2023 · GPA 4.21/4.5 · Advisor: Prof. Hoon Choi</span>
      </li>
    </ul>
  </div>
  <div>
    <h3>Certifications</h3>
    <ul>
      <li>
        <strong>Engineer Information Processing</strong>
        <span class="about-item__meta">HRD Service of Korea · 2025</span>
      </li>
      <li>
        <strong>Cryptography I</strong>
        <span class="about-item__meta">Stanford University · 2025</span>
      </li>
      <li>
        <strong>SQLD (SQL Developer)</strong>
        <span class="about-item__meta">Korea Data Agency · 2021</span>
      </li>
    </ul>
  </div>
</div>

## Skills

<div class="about-skills">
  <div class="about-skill-group">
    <span class="about-skill-group__label">Offensive Security</span>
    <span class="about-chip">Penetration testing</span>
    <span class="about-chip">Fuzzing</span>
    <span class="about-chip">Directed fuzzing</span>
    <span class="about-chip">Vulnerability analysis</span>
    <span class="about-chip">Crash triage</span>
    <span class="about-chip">Root-cause analysis</span>
    <span class="about-chip">Exploitability assessment</span>
  </div>
  <div class="about-skill-group">
    <span class="about-skill-group__label">Languages &amp; Tooling</span>
    <span class="about-chip">C</span>
    <span class="about-chip">C++</span>
    <span class="about-chip">Python</span>
    <span class="about-chip">Bash</span>
    <span class="about-chip">SQL</span>
    <span class="about-chip">Docker</span>
    <span class="about-chip">Git</span>
  </div>
  <div class="about-skill-group">
    <span class="about-skill-group__label">Human Languages</span>
    <span class="about-chip">Korean</span>
    <span class="about-chip">English</span>
  </div>
</div>

## Contact

The fastest way to reach me is email: [sanghyun.park.cnu@gmail.com](mailto:sanghyun.park.cnu@gmail.com). You can also find me on [GitHub](https://github.com/hy38) and [LinkedIn](https://www.linkedin.com/in/sanghyun-park-hy38/). I'm always happy to connect.
````

- [ ] **Step 2: Build**

Run (with environment from "Environment setup"): `bundle exec jekyll build`
Expected: exit code 0, output ends with "done in N seconds."

- [ ] **Step 3: Verify rendered HTML structure and links**

```bash
grep -c 'class="about-stat"' _site/about/index.html
grep -o 'href="/cves/cve-2026-53239-linux-xfrm-policy-uaf/"' _site/about/index.html | head -1
grep -o 'href="/research/bbxfuzz-source-aware-stall-breaking/"' _site/about/index.html | head -1
grep -c 'about-chip' _site/about/index.html
grep -o '<h2 id="[a-z-]*"' _site/about/index.html
```

Expected: `4`; the two href strings echoed back; `16`; six h2 ids (`experience`, `selected-work`, `publications`, `education--certifications`, `skills`, `contact`).

- [ ] **Step 4: Verify linked files exist in the built site**

```bash
for f in cves/index.html cves/cve-2026-53239-linux-xfrm-policy-uaf/index.html research/bbxfuzz-source-aware-stall-breaking/index.html assets/papers/SECAI-2024.pdf assets/papers/SECAI-2024-long-version.pdf assets/papers/CUI-2024.pdf assets/papers/SAS-2022.pdf; do test -e "_site/$f" && echo "OK $f" || echo "MISSING $f"; done
```

Expected: seven `OK` lines, zero `MISSING`.

- [ ] **Step 5: Commit**

```bash
git add _pages/about.md
git commit -m "feat: restructure about page around researcher highlights"
```

---

### Task 2: About page CSS components

**Files:**
- Modify: `assets/css/main.scss` (append at end of file, after the `@media (max-width: 40em)` home-layout block)

- [ ] **Step 1: Append the following to the end of `assets/css/main.scss`:**

```scss
/* About page */

.about-hero {
  margin-bottom: var(--space-8);
}

.about-tagline {
  margin: 0 0 var(--space-3);
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.about-lead {
  max-width: var(--article-copy);
  margin: 0;
  font-size: 1.12rem;
  line-height: 1.75;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: var(--space-8) 0;
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
}

.about-stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  color: inherit;
  text-decoration: none;
}

.about-stat:nth-child(even) {
  border-left: 1px solid var(--line);
}

.about-stat:nth-child(n + 3) {
  border-top: 1px solid var(--line);
}

.about-stat__value {
  font-family: var(--mono);
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.about-stat__value--sm {
  font-size: 1.02rem;
  line-height: 1.9;
}

.about-stat__label {
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--muted);
}

a.about-stat:hover .about-stat__value,
a.about-stat:focus .about-stat__value {
  color: var(--accent);
}

@media (min-width: 48em) {
  .about-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .about-stat:nth-child(n + 2) {
    border-left: 1px solid var(--line);
  }

  .about-stat:nth-child(n + 3) {
    border-top: none;
  }
}

.about-timeline {
  list-style: none;
  margin: var(--space-6) 0;
  padding: 0;
}

.about-timeline > li {
  position: relative;
  margin: 0;
  padding: 0 0 var(--space-6) var(--space-6);
  border-left: 1px solid var(--line);
}

.about-timeline > li:last-child {
  padding-bottom: var(--space-2);
}

.about-timeline > li::before {
  content: "";
  position: absolute;
  top: 0.4rem;
  left: -0.3rem;
  width: 0.55rem;
  height: 0.55rem;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: var(--paper);
}

.about-entry__meta {
  margin: 0 0 var(--space-1);
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.about-timeline .about-entry__title {
  margin: 0 0 var(--space-2);
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.about-timeline > li > p:last-child {
  margin: 0;
  max-width: var(--article-copy);
}

.about-work {
  list-style: none;
  margin: var(--space-6) 0;
  padding: 0;
}

.about-work > li {
  margin: 0;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--line);
}

.about-work > li:last-child {
  border-bottom: 1px solid var(--line);
}

.about-work__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2) var(--space-4);
  margin: 0 0 var(--space-1);
}

.about-work__dates {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
}

.about-work > li > p:last-child {
  margin: 0;
  max-width: var(--article-copy);
}

.about-pubs {
  list-style: none;
  margin: var(--space-6) 0;
  padding: 0;
}

.about-pubs > li {
  margin: 0 0 var(--space-4);
  padding-left: var(--space-4);
  border-left: 1px solid var(--line);
  max-width: var(--article-copy);
}

.about-pubs__venue {
  font-size: 0.88rem;
  color: var(--muted);
}

.about-cols {
  display: grid;
  gap: var(--space-6);
  margin: var(--space-6) 0;
}

.about-cols h3 {
  margin-top: 0;
  font-size: 1rem;
}

.about-cols ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.about-cols li {
  margin: 0 0 var(--space-4);
}

.about-item__meta {
  display: block;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
}

@media (min-width: 48em) {
  .about-cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.about-skills {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.about-skill-group {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2);
}

.about-skill-group__label {
  flex: 0 0 100%;
  font-family: var(--mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.about-chip {
  display: inline-flex;
  padding: 0.18rem var(--space-2);
  background: var(--accent-soft);
  border-radius: var(--radius-label);
  font-size: 0.85rem;
}
```

- [ ] **Step 2: Build**

Run (with environment from "Environment setup"): `bundle exec jekyll build`
Expected: exit code 0, "done in N seconds."

- [ ] **Step 3: Verify compiled CSS contains the new components**

```bash
grep -c "about-stats\|about-timeline\|about-chip" _site/assets/css/main.css
```

Expected: a number ≥ 3 (selectors present in compiled CSS).

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.scss
git commit -m "style: add about page components"
```

---

### Task 3: Update author sidebar bio

**Files:**
- Modify: `_config.yml:121`

- [ ] **Step 1: Change the author bio line**

In `_config.yml`, replace:

```yaml
  bio              : "Security engineer and researcher"
```

with:

```yaml
  bio              : "Security Researcher · AI-driven Pentester"
```

- [ ] **Step 2: Build**

Run (with environment from "Environment setup"): `bundle exec jekyll build`
Expected: exit code 0.

- [ ] **Step 3: Verify the sidebar bio renders on the About page**

```bash
grep -o "AI-driven Pentester" _site/about/index.html | sort -u
```

Expected: `AI-driven Pentester` (appears in both sidebar bio and hero tagline).

- [ ] **Step 4: Commit**

```bash
git add _config.yml
git commit -m "chore: update author bio to match about page positioning"
```

---

### Task 4: Final whole-page verification

**Files:** none (verification only)

- [ ] **Step 1: Clean build**

```bash
bundle exec jekyll build 2>&1 | tail -3
```

Expected: "done in N seconds", exit code 0.

- [ ] **Step 2: Verify every internal href on the About page resolves**

```bash
grep -o 'href="/[^"]*"' _site/about/index.html | sed 's/href="//;s/"$//' | sort -u | while read -r p; do
  p="${p%%#*}"; [ -z "$p" ] && continue
  if [ -e "_site${p}" ] || [ -e "_site${p}index.html" ] || [ -e "_site${p%/}/index.html" ]; then echo "OK $p"; else echo "MISSING $p"; fi
done
```

Expected: all `OK`, zero `MISSING` (theme sidebar/footer links included).

- [ ] **Step 3: Confirm no stray old content remains**

```bash
grep -c "web CV source of truth\|MinIO\|FastAPI" _site/about/index.html
```

Expected: `0` (grep exits 1 with count 0 — that is the pass condition).

- [ ] **Step 4: Review the page visually (optional but recommended)**

Serve locally and eyeball the layout at desktop and ~375px widths:

```bash
bundle exec jekyll serve --port 4000 --skip-initial-build
```

Open `http://localhost:4000/about/`. Stat strip should be 4-across on desktop, 2×2 on mobile; timeline dots aligned; chips wrap cleanly.
