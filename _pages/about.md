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
  <p class="about-lead">I break cars by day — offensive security testing against real vehicles and ECUs at <strong>Autocrypt</strong> — and hunt Linux kernel 0-days by night. My edge is AI-driven offensive security: pairing LLMs with fuzzing to find, reproduce, and fix real-world vulnerabilities, a craft I honed at <strong>KAIST</strong>'s Software Security Lab.</p>
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

The fastest way to reach me is email: [sanghyun.park.cnu@gmail.com](mailto:sanghyun.park.cnu@gmail.com). You can also find me on [GitHub](https://github.com/hy38) and [LinkedIn](https://www.linkedin.com/in/sanghyun-park-hy38/). I'm always happy to connect.
