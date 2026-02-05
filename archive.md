---
layout: page
title: Blog Arşivi
permalink: /archive/
---

<div class="archive-container">
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%d.%m.%Y" }}</span>
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h3>
      </li>
    {% endfor %}
  </ul>
</div>
