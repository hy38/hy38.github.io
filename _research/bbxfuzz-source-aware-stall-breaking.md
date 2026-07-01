---
title: "BBXFuzz: Source-Aware Stall Breaking for BusyBox Fuzzing"
description: "How I built an AFL++ BusyBox fuzzing workflow that detects coverage stalls, analyzes blocked branch conditions and code flow, and uses Codex only when source-aware seed generation can help."
date: 2026-07-01
status: "published"
published: true
cve: "pending"
vendor: "BusyBox"
severity: "TBD"
references:
  - "https://www.usenix.org/system/files/usenixsecurity24-asmita.pdf"
  - "https://arxiv.org/abs/2605.21779"
  - "https://arxiv.org/abs/2412.15931"
  - "https://theori-io.github.io/aixcc-public/afc/Branch%20Flipper.pdf"
  - "https://www.usenix.org/system/files/usenixsecurity25-yang-yupeng.pdf"
redaction: "public"
tags:
  - fuzzing
  - busybox
  - aflplusplus
  - vulnerability-research
  - codex
---

## Summary

I built BBXFuzz because mutation-based fuzzing can get stuck in front of branch conditions that require input structure, parser state, exact strings, numeric boundaries, or code-flow awareness. AFL++ is excellent at executing inputs and measuring coverage, but blind mutation often cannot infer why a near-miss input failed the next branch.

BusyBox was not the motivation by itself. It was the evaluation target that made the motivation concrete. Its applets include small languages and structured formats: awk scripts, shell scripts, ed commands, vi commands, dpkg archives, HTTP requests, compressed inputs, and more. That variety creates many cases where raw byte mutation can spend a long time near a parser path without producing the input shape that satisfies the next condition.

The design insight was to split the work by what each component is good at:

- AFL++ stays in charge of execution, coverage, crashes, and truth.
- A local grammar mutator keeps feeding syntactically useful inputs without network calls.
- A local solver gets the first chance at simple stalled branches.
- Codex is used only when a coverage stall needs source-aware reasoning, with the blocked branch condition, code flow, solver diagnostics, and closest corpus input.
- Any Codex output goes back into the fuzzer as seed files and grammar changes, not as a trusted conclusion.

The claim I am comfortable making is therefore narrow: LLM-assisted stall breaking produced test artifacts that AFL++ could validate. I am not claiming that "the LLM found bugs."

<figure>
  <a href="{{ '/assets/images/research/bbxfuzz-design.svg' | relative_url }}">
    <picture>
      <source media="(max-width: 640px)" srcset="{{ '/assets/images/research/bbxfuzz-design-mobile.svg' | relative_url }}">
      <img src="{{ '/assets/images/research/bbxfuzz-design.svg' | relative_url }}" alt="BBXFuzz design: AFL++ runs local grammar mutation first, then coverage stalls are escalated to Codex through a local solver and source-backed review tasks.">
    </picture>
  </a>
  <figcaption>BBXFuzz keeps the fast path local and escalates only when the fuzzer has concrete coverage evidence that it is stuck.</figcaption>
</figure>

## The Problem I Faced

The core problem was not just invalid syntax. The core problem was that mutation-only fuzzing often cannot explain why a near-miss input failed a branch condition.

BusyBox is a multi-call binary, and each applet has a different input contract. Some applets read scripts from files, some read commands from stdin, some parse binary archive formats, and some are better tested through small harnesses. Treating them all as raw bytes made the fuzzer waste work on invalid inputs, but even syntactically valid inputs could still stop before a hard branch.

That is where I wanted to use an LLM. Not as a replacement fuzzer, and not as a random test-case generator, but as a source-aware assistant for the exact moment where AFL++ had coverage evidence that it was stuck. I needed a workflow where the model only saw a small, evidence-backed task:

1. Here is the blocked branch.
2. Here is the enclosing C source.
3. Here is the closest input that already reaches the area.
4. Explain why the current input fails the condition.
5. Generate a few minimal bypass seeds and update the grammar if the source reveals a missing token, constant, or production.

That framing matters because the fuzzer, not the model, decides whether the answer was useful.

## Motivating Example: A Stalled Shell Path

One historical `ash` stall shows the workflow better than an abstract diagram. In that run, BBXFuzz detected a coverage stall, found 3,783 stuck branches, and escalated the top 5 to Codex after the local solver produced 0 seeds and 0 new edges across 5 runs. The orchestrator log for the escalation cycle reported 2,184 of 4,321 edges, 713,580 executions, and a corpus of 1,965 entries.

The closest corpus input was not a clean shell program. It was a malformed byte-level shell input that happened to reach the relevant area:

```text
0000: 23 21 2f 62 68 30 23 69 6e cd 24 7b 0a 2f 62 68  #!/bh0#in.${./bh
0010: 0a 22 ff 4d 26 00 26 0a 87 4b 24 6e 24 6e 46 24  .".M&.&..K$n$nF$
...
0070: 18 2d 0a 21 2f e0 00 00 7c 69 6e 24 74 69 6d 0a  .-.!/...|in$tim.
```

One blocked source context involved `isdigit_str()` through a here-document and redirection call chain. Another reached `var_end()` through shell variable assignment flow:

```c
static int
isdigit_str(const char *str)
{
	while (isdigit(*str))
		str++;
	return (*str == '\0');
}

static const char *
var_end(const char *var)
{
	while (*var)
		if (*var++ == '=')
			break;
	return var;
}
```

Neither condition is hard in isolation. The hard part is that a mutation-only fuzzer has to synthesize the shell construct that reaches the right parser and variable-flow state. The generated stall PR added five small shell seeds and updated the grammar. One seed targeted readonly assignment and unset behavior:

```sh
#!/bin/sh
f() {
  local v=alpha
  readonly v
  v=beta 2>/dev/null || echo READONLY_HIT
  unset v 2>/dev/null || echo UNSET_RO
}
f
```

Another seed exercised `read -r` with an `IFS=:` heredoc. The grammar update added `trap`, `read` with `IFS=:`, readonly/shift patterns, and constants such as `READONLY_HIT`, `UNSET_RO`, `SHIFT_UNDERFLOW`, `MISSING:`, and `UNKNOWN:`.

The next cycle auto-merged the stall PR with 5 seed files and bumped the grammar to `0.6-stall-3667`. I am intentionally not using the following coverage movement as proof because Tier 1 also injected seeds in that cycle, and the logs I found do not attribute new edges to specific artifacts. The correct claim is narrower: the LLM-assisted stall task produced concrete seeds and grammar changes that AFL++ could execute and judge. That is an example of the workflow, not proof of standalone LLM effectiveness.

## How I Solved It

BBXFuzz has three practical phases.

### Phase 0: Initialize the Applet

Before fuzzing an applet, the tool builds applet-specific artifacts: a grammar JSON file, initial seeds, and variant-hunting prompts. The applet registry records the BusyBox source files, input type, input description, and AFL++ feeding mode for each target. This keeps awk, hush, vi, dpkg, udhcpc, and the other applets from being treated as one generic byte stream.

### Phase 1: Mutate Locally

The local Tier 1 mutator reads the grammar and produces new seeds without calling an LLM. It combines grammar derivation, corpus-aware mutation, and strategy templates. The current default configuration uses a 60-second mutation cycle, 50 seeds per batch, and a 1 MB generated-seed cap.

This is the speed layer. It is cheap, repeatable, and does not need a model in the loop.

### Phase 2: Solve or Escalate Stalls With Source Context

When edge growth stays below the configured threshold across the stall window, BBXFuzz takes a coverage snapshot, finds stuck branches, and extracts nearby C context. A local regex-based constraint solver tries first. If it can patch a seed for a simple branch condition, the fuzzer can keep moving without Codex.

When the solver produces no seeds, or after repeated solver-only rounds, the stalled branch is escalated into a reviewable task in my private workflow. The work item is intentionally narrow: use the supplied evidence to generate bypass seeds and update the grammar.

The important detail is that the prompt is not just "make more inputs." It carries the branch condition, function body, call chain, covered siblings, closest corpus input, and solver diagnostics when available. That is what lets the model reason about the actual path constraint and code flow instead of guessing.

## The Design Insight

The useful boundary was this:

> Use models for source-aware decisions; use fuzzers for execution truth.

I did not want the model to replace AFL++. I wanted it to read the part of the C source that AFL++ had already identified as interesting, then produce small artifacts that AFL++ could immediately accept or reject.

This also changed the grammar from a static file into a campaign memory. When a stall reveals a missing keyword, magic value, command form, or boundary token, the grammar can be updated so future local mutations start closer to that path.

## What Is Different From Related Work

The related work matters because "LLM plus fuzzing" is no longer a novel claim by itself.

| Work | Venue/status | Trigger for LLM use | LLM output unit | Fuzzer role | BBXFuzz difference |
| --- | --- | --- | --- | --- | --- |
| [Asmita et al.](https://www.usenix.org/system/files/usenixsecurity24-asmita.pdf) | USENIX Security 2024 | Before fuzzing and crash reuse | Target-specific initial seeds | AFL++ evaluates generated seed corpora | BBXFuzz escalates after an observed stall and persists both seeds and grammar deltas. |
| [FuzzingBrain V2](https://arxiv.org/abs/2605.21779) | arXiv preprint, submitted May 20, 2026 | Agent-selected suspicious points | PoCs, reproduction artifacts, reports | Fuzzing grounds agent output | BBXFuzz is narrower: applet fuzzing artifacts, not an end-to-end vulnerability agent. |
| [HyLLfuzz](https://arxiv.org/abs/2412.15931) | arXiv preprint, 2024 with 2026 revision | Greybox roadblocks | Modified inputs from LLM-assisted concolic reasoning | Coverage-guided loop validates reachability | BBXFuzz is similar in stall timing but uses practical seed/grammar PRs instead of a concolic-execution framing. |
| [HLPFUZZ](https://www.usenix.org/system/files/usenixsecurity25-yang-yupeng.pdf) | USENIX Security 2025 | Complex constraints in language processors | Constraint-solving inputs | Hybrid fuzzing validates deeper states | BBXFuzz targets BusyBox applets and command/file/network formats, not language processors as a class. |
| [Branch Flipper](https://theori-io.github.io/aixcc-public/afc/Branch%20Flipper.pdf) | AIxCC public technical report | Fuzz blockers | Blocker-unlocking seeds, including binary formats via Kaitai | Coverage feedback grounds retries | BBXFuzz has weaker binary-format support, but integrates applet grammars and reviewable GitHub seed PRs into a live AFL++ campaign. |

The honest positioning is not "BBXFuzz is better than all of these systems." The claim is more specific: BBXFuzz is designed for source-aware stall breaking in a live AFL++ BusyBox campaign, with a strict boundary between model-suggested artifacts and fuzzer-validated outcomes. On binary-input blocker work, Branch Flipper is a stronger reference point. On systematic constraint solving for language processors, HLPFUZZ is stronger. BBXFuzz is better aligned with my BusyBox workflow because its artifacts are simple: seed files, grammar rules, and campaign logs.

## Evidence Boundary

The project currently registers 24 BusyBox applet targets, with four blacklisted because they reached coverage plateaus. The live applet set spans editors, shells, coreutils-like tools, archive parsers, and network-facing inputs.

For the vulnerability-reporting side of the work, I keep the public details out of this post. I do not have enough public-safe attribution here to say which reports came from plain AFL++ mutations, grammar mutations, solver seeds, or Codex-generated artifacts. Publishing a disclosure paragraph without that attribution would imply more than the current evidence proves.

The workflow result I can describe is the loop:

1. AFL++ discovers coverage reality.
2. BBXFuzz extracts the stuck source context.
3. The local solver tries cheap seed patches first.
4. Codex proposes small seed and grammar changes when local solving is not enough.
5. AFL++ tests those changes.
6. Any crashes are reproduced and triaged separately from the model-generated suggestion.

That loop gave me a way to move from coverage stalls to source-backed artifacts without trusting unverified model output.

## What the Ablation Should Measure

I searched the local project state before writing this section. I did not find a completed, apples-to-apples vanilla AFL++ baseline campaign for the same BusyBox build, target set, seed corpus, CPU budget, and 24-hour window. That means I should not claim a quantified BBXFuzz-over-vanilla improvement yet.

The ablation I would trust has to run the same targets under the same environment:

| Variant | Enabled components | Question it answers |
| --- | --- | --- |
| Vanilla AFL++ | Initial corpus only | What does AFL++ reach without BBXFuzz guidance? |
| Grammar only | Tier 1 grammar mutation | How much comes from syntactically valid local mutation? |
| Grammar plus solver | Tier 1 and local branch solver | How much comes from cheap deterministic stall breaking? |
| Codex seeds only | Tier 2 seeds, no grammar persistence | Does one-time LLM seed generation help after stalls? |
| Full BBXFuzz | Grammar, solver, Codex seeds, grammar updates | Does the persistent seed plus grammar loop improve over all lower tiers? |

The metrics should be collected per applet and per campaign window:

- Edge coverage over time.
- Time to first new edge after a detected stall.
- Number of generated seeds that survive AFL++ execution and corpus minimization.
- Unique crashes after deduplication and ASAN reproduction.
- Number of Codex calls, merged PRs, rejected PRs, and stale or duplicate seeds.
- Prompt bytes, prompt tokens, completion tokens, model, latency, and cost per call.
- 24-hour totals for all of the above.

The main hypotheses are testable. If BBXFuzz improves performance, the likely causes are not just "LLM magic." They are: fewer invalid inputs from applet grammars, stall gating that avoids constant model use, source context that makes generated seeds more relevant, local solver attempts that avoid unnecessary Codex calls, and grammar updates that amortize one good stall analysis across later local mutations.

## Prompt-Token and Cost Boundary

Current GitHub-mode BBXFuzz logs preserve prompt files, issue counts, seed PRs, grammar versions, and turnaround observations. They do not preserve exact API token usage because the historical workflow did not call a metered API directly from the fuzzer. I also did not find archived completion text for every call, so completion tokens and end-to-end cost are missing.

What I can measure is prompt size. I ran an offline tokenizer over 2,111 archived `stall_*.md` prompt files from the `work-20260406_224550` session using the `cl100k_base` tokenizer, which is an OpenAI GPT-3.5/GPT-4-era tokenizer. It may not match the exact Codex model tokenizer used by the historical workflow, and it will not match Anthropic tokenization or newer OpenAI tokenizers exactly. This is a prompt-size proxy, not billing data.

| Prompt token proxy | Tokens |
| --- | ---: |
| Minimum | 661 |
| 25th percentile | 5,615 |
| Median | 6,906 |
| 75th percentile | 10,059 |
| 90th percentile | 12,179 |
| Maximum | 14,006 |
| Mean | 7,998 |

The `ash` stall example above was 12,700 bytes, 1,498 words, and 3,702 prompt-token-proxy tokens, which is below the 25th percentile of this archive. The later `vi` #3811 prompt was 19,384 bytes, 2,407 words, and 6,623 prompt-token-proxy tokens, close to the median. A submit-ready evaluation should log prompt tokens, completion tokens, model identity, wall time, retries, and whether the resulting seeds were accepted by AFL++.

## What Worked Well

The strongest part of the design was forcing every high-level idea to become a file the fuzzer could use. A seed either increases coverage, crashes, or does nothing. A grammar update either generates useful shapes or it does not. A patch either turns RED reproducer runs into GREEN runs or it does not.

The reviewable task workflow also helped. It turned "ask Codex" into a small queue of source-backed changes: each stall had an evidence bundle, a seed update, and a grammar diff.

## What I Would Improve

The first improvement is measurement. Before I submit this as a paper, I need the vanilla AFL++ baseline and the ablation matrix above. Without that, the correct conclusion is that the design is plausible and useful in my workflow, not that it is quantitatively superior.

The second improvement is token accounting. Every Tier 2 request should record prompt tokens, completion tokens, latency, model, retry count, and post-fuzzing outcome.

The third improvement is tighter attribution. A merged seed PR should be linked to later coverage changes and minimized corpus survival, so I can say which stall-breaking artifacts actually mattered and which were harmless but unproductive.

I would also keep the public disclosure path separate from the fuzzing path. Pending vulnerability details should not leak just because the fuzzer generated a good internal report.

## Accuracy Boundary

This post only states details I checked against the local repository and run logs on 2026-07-01. It intentionally does not include pending PoCs, exploit details, unassigned CVE identifiers, or report-to-applet mapping. It also does not claim a completed vanilla-AFL++ ablation or exact end-to-end cost result, because I did not find that evidence in the local logs.

## References

- [Fuzzing BusyBox: Leveraging LLM and Crash Reuse for Embedded Bug Unearthing](https://www.usenix.org/system/files/usenixsecurity24-asmita.pdf), USENIX Security 2024.
- [FuzzingBrain V2: A Multi-Agent LLM System for Automated Vulnerability Discovery and Reproduction](https://arxiv.org/abs/2605.21779), arXiv preprint submitted May 20, 2026.
- [Large Language Model assisted Hybrid Fuzzing](https://arxiv.org/abs/2412.15931), arXiv 2024/2026 revision.
- [Branch Flipper: Unlocking Fuzz Blockers with Coverage-Grounded Seed Generation](https://theori-io.github.io/aixcc-public/afc/Branch%20Flipper.pdf), AIxCC public technical report.
- [Hybrid Language Processor Fuzzing via LLM-Based Constraint Solving](https://www.usenix.org/system/files/usenixsecurity25-yang-yupeng.pdf), USENIX Security 2025.
