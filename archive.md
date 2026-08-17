---
layout: editorial
title: Yazı Arşivi
description: 2006’dan bugüne veri bilimi, yapay zekâ, teknoloji, öğrenme ve hayat üzerine yazılar.
permalink: /archive/
lang: tr
wide: true
eyebrow: AÇIK ARŞİV
---

{% assign archive_posts = site.posts | where_exp: "post", "post.redirect_to == nil" %}

<section class="archive-featured" aria-labelledby="technical-archive-title">
  <div>
    <p class="eyebrow">TEKNİK ARŞİVDEN SEÇKİ</p>
    <h2 id="technical-archive-title">Python, veri bilimi ve yazılım notları</h2>
    <p>Eski ve yeni teknik yazılara hızlı erişim. Tarihli yazılarda kullanılan bazı kütüphane ve arayüzler zaman içinde değişmiş olabilir.</p>
  </div>
  <nav aria-label="Seçili teknik yazılar">
    <a href="/bilgisayar/2022/03/02/pythonda-kume-islemleri.html">Python’da küme işlemleri</a>
    <a href="/bilgisayar/genel/2012/12/19/python-ile-xml-verisini-islemek-parse-etmek.html">Python ile XML işlemek</a>
    <a href="/bilgisayar/genel/2012/06/08/python-ile-excel-manipulasyonu.html">Python ile Excel</a>
    <a href="/bilgisayar/2023/02/13/featurewiz-ile-otomatik-feature-selection.html">Featurewiz ile feature selection</a>
    <a href="/bilgisayar/2019/11/01/rcrawler-ile-web-crawling-islemi.html">R ile web crawling</a>
    <a href="/bilgisayar/ekonomi/muhendislik/yazilim/2019/03/28/market-sepeti-analizi-nedir.html">Market sepeti analizi</a>
    <a href="/cocuklar/bilgisayar/2017/06/04/arduino-kullanmaya-giris.html">Arduino’ya giriş</a>
    <a href="/bilgisayar/genel/2012/04/13/javascript-ile-url-parametrelerine-erisim.html">JavaScript URL parametreleri</a>
    <a href="/bilgisayar/genel/2012/02/14/flask-framework.html">Flask framework</a>
    <a href="/data/performance/sql%20server/2025/08/07/sql-approx-query.html">SQL Server yaklaşık satır sayımı</a>
  </nav>
</section>

<div class="archive-toolbar">
  <label for="archive-search">Arşivde ara</label>
  <div class="archive-search-wrap">
    <span class="material-symbols-rounded" aria-hidden="true">search</span>
    <input id="archive-search" type="search" placeholder="Başlık veya konu yazın…" autocomplete="off">
  </div>
  <p><strong id="archive-count">{{ archive_posts | size }}</strong> yazı</p>
</div>

<div class="archive-list" id="archive-list">
  {% for post in archive_posts %}
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
