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
  <p class="about-lead">By day I break vehicles at <strong>Autocrypt</strong> — offensive tests on real cars and ECUs. By night I hunt 0-days in the Linux kernel. My edge: pairing LLMs with fuzzing, a craft built at <strong>KAIST</strong>'s Software Security Lab.</p>
</div>

<div class="about-stats">
  <a class="about-stat" href="/cves/" target="_blank" rel="noopener">
    <span class="about-stat__value">7</span>
    <span class="about-stat__label">Linux kernel 0-days discovered</span>
  </a>
  <a class="about-stat" href="/research/bbxfuzz-source-aware-stall-breaking/" target="_blank" rel="noopener">
    <span class="about-stat__value">14</span>
    <span class="about-stat__label">BusyBox 0-days discovered</span>
  </a>
  <a class="about-stat" href="/cves/cve-2026-53239-linux-xfrm-policy-uaf/" target="_blank" rel="noopener">
    <span class="about-stat__value about-stat__value--sm">CVE-2026-53239</span>
    <span class="about-stat__label">Linux XFRM UAF · High · CVSS 7.8</span>
  </a>
  <a class="about-stat" href="https://fuzzing-survey.org/" target="_blank" rel="noopener noreferrer">
    <span class="about-stat__value">361+</span>
    <span class="about-stat__label">Fuzzers cataloged in Fuzzing Survey</span>
  </a>
</div>

## Experience

<ol class="about-timeline">
  <li>
    <p class="about-entry__meta">Jun 2025 – Present · Seoul, South Korea</p>
    <h3 class="about-entry__title">Security Researcher · Autocrypt</h3>
    <p>Vehicle Threat Research Lab. I run offensive tests against in-vehicle networks, ECUs, and wireless attack surfaces — and build the automation tooling behind them.</p>
  </li>
  <li>
    <p class="about-entry__meta">Feb 2023 – Feb 2025 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Graduate Researcher · KAIST Software Security Lab</h3>
    <p>Fuzzing and LLM-assisted vulnerability reproduction under Prof. Sang Kil Cha. Built LLM1dFuzz; maintained the Fuzzing Survey.</p>
  </li>
  <li>
    <p class="about-entry__meta">Apr 2022 – Feb 2023 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Research Intern · CNU Mobile Distributed Computing Lab</h3>
    <p>Architected a distributed IoT storage system on MinIO: GET +347%, PUT +155% across 4 nodes. Led the edge-cloud migration of a power-plant surveillance system — a custom real-time protocol and a FastAPI integration API.</p>
  </li>
  <li>
    <p class="about-entry__meta">Dec 2021 – Feb 2022 · Indianapolis, USA</p>
    <h3 class="about-entry__title">Visiting Scholar · Purdue University</h3>
    <p>Built a long-range shot-group measurement system with LoRa, YOLOv5, and edge computing. Published at IEEE SAS 2022.</p>
  </li>
  <li>
    <p class="about-entry__meta">Jul 2021 – Dec 2021 · Daejeon, South Korea</p>
    <h3 class="about-entry__title">Research Intern · CNU Software Analysis and Testing Lab</h3>
    <p>First research role: automated software testing and analysis.</p>
  </li>
</ol>

## Selected Work

<ul class="about-work">
  <li>
    <p class="about-work__head"><strong>Linux Kernel Vulnerability Research</strong><span class="about-work__dates">2026 – present</span></p>
    <p>Independent audits of Linux kernel subsystems with LLM-assisted analysis, fuzzing, and manual review. Seven 0-days reported and patched upstream via the kernel mailing lists. Writeups in the <a href="/cves/" target="_blank" rel="noopener">CVE archive</a>.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>BBXFuzz</strong><span class="about-work__dates">2026</span></p>
    <p>LLM-assisted fuzzing of BusyBox applets: 14 0-days, from harness generation to crash triage. <a href="/research/bbxfuzz-source-aware-stall-breaking/" target="_blank" rel="noopener">Project writeup</a>.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>LLM1dFuzz</strong><span class="about-work__dates">2023 – 2025</span></p>
    <p>Master's thesis. An LLM-guided framework that reproduces 1-day vulnerabilities and seeds directed fuzzing. Published at SECAI 2024.</p>
  </li>
  <li>
    <p class="about-work__head"><strong>Fuzzing Survey</strong><span class="about-work__dates">2023 – 2025</span></p>
    <p>Maintained <a href="https://fuzzing-survey.org/" target="_blank" rel="noopener noreferrer">fuzzing-survey.org</a>, a genealogy of 361+ fuzzers and the papers behind them.</p>
  </li>
</ul>

## Publications

<ul class="about-pubs">
  <li>
    <a href="/assets/papers/SECAI-2024.pdf" target="_blank" rel="noopener"><strong>Systematic Bug Reproduction with Large Language Model</strong></a><br>
    <span class="about-pubs__venue">ESORICS Workshop on Security and Artificial Intelligence (SECAI) · 2024 · <a href="/assets/papers/SECAI-2024-long-version.pdf" target="_blank" rel="noopener">long version</a></span>
  </li>
  <li>
    <a href="/assets/papers/CUI-2024.pdf" target="_blank" rel="noopener"><strong>ChatFive: Enhancing User Experience in Likert Scale Personality Test through Interactive Conversation with LLM Agents</strong></a><br>
    <span class="about-pubs__venue">ACM Conference on Conversational User Interfaces (CUI) · 2024</span>
  </li>
  <li>
    <a href="/assets/papers/SAS-2022.pdf" target="_blank" rel="noopener"><strong>Feasibility of Measuring Shot Group Using LoRa Technology and YOLO V5</strong></a><br>
    <span class="about-pubs__venue">IEEE Sensors Applications Symposium (SAS) · 2022</span>
  </li>
</ul>

## Education

<ul class="about-edu">
  <li>
    <strong>KAIST</strong> — M.S., Computer Science (School of Computing)
    <span class="about-item__meta">2023 – 2025 · Advisor: Prof. Sang Kil Cha</span>
  </li>
  <li>
    <strong>Chungnam National University</strong> — B.S., Computer Science and Engineering
    <span class="about-item__meta">2017 – 2023 · GPA 4.21/4.5 · Advisor: Prof. Hoon Choi</span>
  </li>
</ul>

## Contact

Email is fastest: <a href="mailto:sanghyun.park.cnu@gmail.com">sanghyun.park.cnu@gmail.com</a>. Also on <a href="https://github.com/hy38" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="https://www.linkedin.com/in/sanghyun-park-hy38/" target="_blank" rel="noopener noreferrer">LinkedIn</a> — always happy to connect.
