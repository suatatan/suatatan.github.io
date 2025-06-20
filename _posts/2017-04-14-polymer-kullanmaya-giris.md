---
layout: post
title: "Kendi HTML Taglarınızı Oluşturun: Polymer Kullanmaya Giriş"
date: 2017-04-14
categories: 
  - "bilgisayar"
tags: 
  - "javascript"
  - "polymer"
---

![polymer_logo](/images/polymer_logo.png)

Polymer Framework'u kendi html etiketlerinizi üretmeye ve kullanmaya yarıyor. Üstelik bu etiketlere CSS stilleri ve Javascript ekleyebiliyorsunuz. Böyle 'yeniden kullanılabilir' nesneler, yani butonlar, portletler, formlar vs. oluşturabiliyorsunuz.

Örneğin:

> <benim-obicim-tagim></benim-obicim-tagim>
> 
> <yenieklebutonu renk='mavi' id='cabbar'></yenieklebutonu>

Bu özellikle temaya bağlı tasarımlarda her bir eleman için tekrar tekrar CSS tanımlamak, çağırmak, kullanmak gibi işlerden oluşan yükü hafifletebilir.

Basit bir örnek olarak aşağıdaki kodları göstereyim:

> <!DOCTYPE html> <html lang="en"> <head> [https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js](https://polygit.org/webcomponentsjs+1.0.0-rc.5/components/webcomponentsjs/webcomponents-loader.js)
> 
> <!-- Polymer nesnemizi aşağıdaki gibi çağırıyoruz html içinden html:)--> **<link rel="import" href="dom-element.html">** </head> <body>
> 
> <!-- Aşağıdaki elemanın adını keyfimize göre veriyoruz --> **<dom-element></dom-element>** </body> </html>

Burada dom-element'ini sonradan tanımladık. Bunu ise aşağıdaki html dosyası içinden üretiyoruz:

> <link rel="import" href="https://polygit.org/polymer+2.0.0-rc.2/components/polymer/polymer-element.html">
> 
> <dom-module id="**dom-element**"> <template>
> 
> **<style>** **.kirmizi{** **color:red;** **}** **</style>**
> 
> **<p class="kirmizi">Aha bu benim öz tag'ımdır</p>** </template>
> 
> class DomElement extends Polymer.Element { static get is() { return "dom-element"; } } customElements.define(DomElement.is, DomElement);
> 
> </dom-module>

Sonuç da şu:

![polymer](/images/polymer.png)

Detaylı bilgi için: [Polymer Resmi Sitesi](https://www.polymer-project.org/)
