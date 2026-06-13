# Blog Post Authoring

Publish a blog post by adding one Markdown file under `_posts/`.

## File path

Use this exact path and filename pattern:

```text
_posts/YYYY-MM-DD-title.md
```

Example:

```text
_posts/2026-06-13-notes-from-a-debugging-session.md
```

The date in the filename controls when Jekyll treats the post as publishable. A post dated in the future may not appear until that date unless the site is built with future posts enabled.

Arbitrary Markdown files outside `_posts/YYYY-MM-DD-title.md` are not a blog publishing path. Keep posts in `_posts/` unless the site config is changed intentionally.

## Minimal front matter

Start every blog post with YAML front matter like this:

```yaml
---
title: "Notes from a Debugging Session"
description: "What changed, what broke, and what I learned."
date: 2026-06-13
---
```

Then write the post body below the closing `---` line.

## Optional fields

These fields are safe to add when they help the page:

```yaml
tags:
  - debugging
  - jekyll
toc: true
toc_label: "Contents"
header:
  image: /assets/images/example.jpg
  caption: "Image credit or context"
```

## Publish checklist

1. Save the file at `_posts/YYYY-MM-DD-title.md`.
2. Keep `title`, `description`, and `date` in the front matter.
3. Use a clear slug in the filename, lowercase words separated by hyphens.
4. Run `bundle exec jekyll build --trace --verbose` before publishing.
5. Check the generated page locally before pushing public content.

## Drafts

Use `_drafts/` only for private local writing. Draft files do not publish through the documented blog path unless you build with draft support or move them into `_posts/`.

Do not commit private drafts if the repository is public. If a draft is meant to stay private, keep it out of public files.
