# Research Report Authoring

Publish a research or CVE report by adding one Markdown file under `_research/`.

## File path

Use this exact path pattern:

```text
_research/{slug}.md
```

Example:

```text
_research/cve-2026-example-vendor-product.md
```

Arbitrary Markdown files outside `_research/{slug}.md` are not a research publishing path. Keep public reports in `_research/` unless the site config is changed intentionally.

## Required front matter

Start every report with YAML front matter like this:

```yaml
---
title: "CVE-2026-0000 Example Product Heap Overflow"
description: "Short public summary of the finding and affected component."
date: 2026-06-13
status: "published"
cve: "CVE-2026-0000"
vendor: "Example Vendor"
severity: "High"
references:
  - "https://example.com/advisory"
redaction: "public"
tags:
  - cve
  - vulnerability-research
---
```

Use `cve: "pending"` only when a public report is already safe to publish and the identifier has not been assigned yet. If the report is not safe to publish, do not commit it as a public file.

## Metadata guidance

1. `title`, use the public report title.
2. `description`, use one or two sentences safe for previews and search results.
3. `date`, use the intended public publication date.
4. `status`, use values such as `draft`, `embargoed`, `coordinated`, or `published`, but only commit public-safe files.
5. `cve`, use the assigned CVE ID, `pending`, or `none`.
6. `vendor`, name the affected vendor or project.
7. `severity`, use the public severity label.
8. `references`, include public advisories, patches, commits, or related writeups.
9. `redaction`, state whether the report is `public`, `redacted`, or `private-not-for-commit`.
10. `tags`, include useful grouping terms.

## Redaction and status rules

Draft, embargoed, or private reports must not be committed as public files unless they are intentionally publishable.

Before committing a report, remove secrets, exploit details that should remain private, non-public vendor communication, private emails, internal case numbers, and any proof-of-concept code that is not approved for release.

If a report needs placeholders, mark them clearly in the body and keep `redaction` accurate. Do not publish a file with sensitive content and hope the front matter will hide it.

## Report outline

```markdown
## Summary

Public summary of impact and affected versions.

## Timeline

Disclosure and patch timeline safe for publication.

## Technical details

Root cause, trigger conditions, and patch notes that are approved for release.

## Mitigation

Upgrade, patch, configuration, or workaround guidance.

## References

Public links only.
```
