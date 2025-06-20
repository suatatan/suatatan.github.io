---
categories:
- bilgisayar
- genel
date: 2012-05-04
layout: post
tags:
- turkish
- google-app-engine
- longread
- sorucevap
- technology
title: Google App Engine ile MySQL ve Oracle kullanımı mümkün mü?
---

**Soru (Yunus Santur):**

Suat hocam merhaba bir sorum olacaktı size

google app engine'nın veritabanı desteği nedir mysql, sql, oracle ile kullanabilirmiyim?

  

**Cevap:**

Yunus Bey Merhabalar;  
Google App Engine varsayılan olarak Kendi nesnel bulut veritabanını sunuyor. Önce ben de garipsemiştim ancak Google App Engine'nin datastore dediği kendi veritabanı hepsinden daha kullanışlı. Kitapta ilgili bölümde kullanımı hakkında anlatım var.Ayrıca Google Datastore kullanırken SQL sorgusu ile listeleme yapmak mümkün. (Bazı kısıtlamalar var). Ya da Google'nin kendi sorgu dili olan GQL ile de sorgu yapılabiliyor.  
  
Google App Engine'nin kendi lokal MySQL sunuucusu yok. Bu nedenle Google App Engine üzerinde MySQL kullanamazsınız. Ancak RemoteSQL özelliği olan harici bir veritabanı sunucusu kullanıyorsanız, bunu kullanarak MySQL kullabilirsiniz. Fakat bu yöntemi denemedim. Oracle için de aynı durum geçerli.  
  
Öneri olarak; Eğer sizi MySQL veya Oracle kullanmaya iten kurumsal bir zorunluluk yoksa, Google App Engine datastore fazlası ile iş görecektir.
