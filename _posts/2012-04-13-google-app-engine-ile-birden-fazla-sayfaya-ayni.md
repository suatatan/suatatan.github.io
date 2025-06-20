---
layout: post
title: "Google App Engine ile birden fazla sayfaya aynı şablonu uygulama"
date: 2012-04-13
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "google-app-engine"
---

Hazırladığınız bir web sayfasının şablonunu tüm sayfalara uygulamak web tasarımın vazgeçilmez süreçlerindendir. Bunun için sıklıkla Dreamweaver kullanılır. Ancak Dreamweaver'i kullanmıyor  veya kullanmak istemiyorsanız Python ile Google App Engine'da  bunun için profesyonel başka bir çözüm var. Anlatayım:

layout.html ve iletisim.html dosyamız aynı klasörde olacak

Tüm sayfalara uygulamak istediğiniz herhangi bir layout.html dosyası:

HTML>

# Şirket Adı

* * *

Şablonun uygulanacağı sayfa ise aşağıdaki gibidir (iletisim.html):

# İletişim

İletişim Bilgilerimiz

Dikkat edilirse, iletisim.html'de şablonumuz sade ve sadece o sayfadaki içeriğimiz var. Şablon bilgisi layout.html'den alınıyor. layout.html ile iletisim.html dosyasındaki kırmızı kodları eşleştirince şablonumuzun nasıl kolaylıkla başka sayfalara uygulanabilir olduğunu görüyoruz. extends ve block ifadeleri Django/Jinja2 gibi şablon motorlarına özgüdür, Jekyll'da kullanılmaz.
