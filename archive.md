---
layout: editorial
title: Yazı Arşivi
description: 2006’dan bugüne veri bilimi, yapay zekâ, teknoloji, öğrenme ve hayat üzerine yazılar.
permalink: /archive/
lang: tr
wide: true
eyebrow: AÇIK ARŞİV
---

<div class="archive-toolbar">
  <label for="archive-search">Arşivde ara</label>
  <div class="archive-search-wrap">
    <span class="material-symbols-rounded" aria-hidden="true">search</span>
    <input id="archive-search" type="search" placeholder="Başlık veya konu yazın…" autocomplete="off">
  </div>
  <p><strong id="archive-count">{{ site.posts | size }}</strong> yazı</p>
</div>

<div class="archive-list" id="archive-list">
  {% for post in site.posts %}
    <article class="archive-entry" data-search="{{ post.title | downcase | escape }} {{ post.tags | join: ' ' | downcase | escape }}">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d.%m.%Y" }}</time>
      <div>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
        {% if post.tags and post.tags != empty %}<p>{{ post.tags | join: " · " }}</p>{% endif %}
      </div>
      <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
    </article>
  {% endfor %}
</div>

<p class="archive-empty" id="archive-empty" hidden>Bu aramayla eşleşen bir yazı bulunamadı.</p>

<script>
  (() => {
    const input = document.querySelector('#archive-search');
    const entries = [...document.querySelectorAll('.archive-entry')];
    const count = document.querySelector('#archive-count');
    const empty = document.querySelector('#archive-empty');
    if (!input) return;
    input.addEventListener('input', () => {
      const query = input.value.toLocaleLowerCase('tr-TR').trim();
      let visible = 0;
      entries.forEach((entry) => {
        const match = !query || entry.dataset.search.includes(query);
        entry.hidden = !match;
        if (match) visible += 1;
      });
      count.textContent = visible;
      empty.hidden = visible !== 0;
    });
  })();
</script>
