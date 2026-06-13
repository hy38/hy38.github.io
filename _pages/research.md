---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% assign research_entries = site.research | sort: "date" | reverse %}
{% assign public_research_count = 0 %}
{% for entry in research_entries %}
  {% unless entry.published == false %}
    {% assign public_research_count = public_research_count | plus: 1 %}
  {% endunless %}
{% endfor %}

{% if public_research_count > 0 %}
  <div class="entries-list">
  {% for entry in research_entries %}
    {% unless entry.published == false %}
      <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
        <h2 class="archive__item-title no_toc" itemprop="headline">
          <a href="{{ entry.url | relative_url }}" rel="permalink">{{ entry.title | default: "Untitled research" | escape }}</a>
        </h2>

        {% if entry.description %}
          <p class="archive__item-excerpt" itemprop="description">{{ entry.description | markdownify | strip_html | truncate: 220 }}</p>
        {% endif %}

        {% if entry.date or entry.status or entry.redaction %}
          <p class="page__meta">
            {% if entry.date %}
              <span class="page__meta-date">{{ entry.date | date: "%B %-d, %Y" }}</span>
            {% endif %}
            {% if entry.status %}
              {% if entry.date %}<span class="page__meta-sep"> | </span>{% endif %}<span>Status: {{ entry.status | escape }}</span>
            {% endif %}
            {% if entry.redaction %}
              {% if entry.date or entry.status %}<span class="page__meta-sep"> | </span>{% endif %}<span>Redaction: {{ entry.redaction | escape }}</span>
            {% endif %}
          </p>
        {% endif %}

        {% if entry.cve or entry.vendor or entry.severity %}
          <p>
            {% if entry.cve %}<strong>CVE:</strong> {{ entry.cve | escape }}{% endif %}
            {% if entry.vendor %}{% if entry.cve %}<br>{% endif %}<strong>Vendor:</strong> {{ entry.vendor | escape }}{% endif %}
            {% if entry.severity %}{% if entry.cve or entry.vendor %}<br>{% endif %}<strong>Severity:</strong> {{ entry.severity | escape }}{% endif %}
          </p>
        {% endif %}

        {% if entry.tags and entry.tags.size > 0 %}
          <p class="archive__item-tags">
            {% for tag in entry.tags %}
              <span class="page__taxonomy-item">{{ tag | escape }}</span>{% unless forloop.last %} {% endunless %}
            {% endfor %}
          </p>
        {% endif %}
      </article>
    {% endunless %}
  {% endfor %}
  </div>
{% else %}
  <p>No public research entries are available yet.</p>
{% endif %}
